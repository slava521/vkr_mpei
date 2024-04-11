import csv
import os
from datetime import datetime

import xlsxwriter
from django.http import HttpResponse
from rest_framework.exceptions import ParseError
from rest_framework.response import Response

from weather_mpei.settings import BASE_DIR


def date_filter(request, model):
    date_from = request.query_params.get('date_from', default=None)
    date_to = request.query_params.get('date_to', default=None)

    if date_from is not None or date_to is not None:
        if date_from is None:
            date_start = datetime(1900, 1, 1, 0, 0, 0)
            return model.objects.filter(date__range=(date_start, date_to))
        if date_to is None:
            date_now = datetime.now()
            return model.objects.filter(date__range=(date_from, date_now))
        return model.objects.filter(date__range=(date_from, date_to))
    return model.objects.all()


def main_param_json(model, allowed_params, request, **kwargs):
    param = kwargs['param']
    param = param.upper()
    if param not in allowed_params:
        raise ParseError(detail='Неверный параметр')

    date_from = request.query_params.get('date_from', default=None)
    date_to = request.query_params.get('date_to', default=None)
    if date_from is None or date_to is None:
        raise ParseError(detail='Отсутствие date_from или date_to в query параметрах')

    ids = model.objects.filter(date__range=(date_from, date_to)).values('id')

    labels = []
    values = []

    length = len(ids)
    limit = int(length / 40)
    for i in range(40):
        offset = i * limit + limit
        if offset >= length:
            offset = length - 1
        current_values = model.objects.filter(id__range=(ids[i * limit]['id'], ids[offset]['id'])).values(param, 'date')
        temp_sum = 0
        for value in current_values:
            temp_sum += float(value[param])
        avg = temp_sum / len(current_values)

        labels.append(current_values[len(current_values) - 1]['date'].strftime('%d.%m.%Y %H:%M'))
        values.append(avg)

    return Response({'labels': labels, 'values': values})


def download_csv_data(request, model, filepath):
    query_set = date_filter(request, model)
    headers = [str(data.name) for data in query_set[0]._meta.fields]
    with open(filepath, 'w+', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        for obj in query_set:
            data = [str(obj.__getattribute__(d)) for d in headers]
            writer.writerow(data)


def download_xlsx_data(request, model, filepath):
    file = open(filepath, 'w+', encoding='utf-8')
    file.close()
    book = xlsxwriter.Workbook(filepath)
    sheet = book.add_worksheet()
    row = 0
    column = 0
    query_set = date_filter(request, model)
    headers = [str(data.name) for data in query_set[0]._meta.fields]
    for header in headers:
        sheet.write(row, column, header)
        column += 1
    row += 1
    column = 0
    for obj in query_set:
        data = [str(obj.__getattribute__(d)) for d in headers]
        for d in data:
            sheet.write(row, column, d)
            column += 1
        column = 0
        row += 1
    book.close()


def download_file_response(model, filename, request, **kwargs):
    file_type = kwargs['file_type']
    if file_type not in ['csv', 'xlsx']:
        raise ParseError(detail='Неверный тип файла')
    temp_filename = datetime.now().strftime("f%d%m%Y%H%M%S%f")
    filepath = os.path.join(str(BASE_DIR), "weather_app", "files", temp_filename + "." + file_type)
    if file_type == 'csv':
        download_csv_data(request, model, filepath)
    if file_type == 'xlsx':
        download_xlsx_data(request, model, filepath)

    to_download = open(filepath, 'rb')
    content_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if file_type == 'csv':
        content_type = 'text/csv'
    response = HttpResponse(to_download.read(), content_type=content_type)
    response['Content-Disposition'] = 'attachment; filename="' + filename + "." + file_type + '"'
    to_download.close()
    os.remove(filepath)
    return response
