import base64
import csv
import io
import os
from datetime import datetime
from json import detect_encoding

import xlsxwriter
from django.core.exceptions import ValidationError
from django.http import HttpResponse, FileResponse
from rest_framework.exceptions import ParseError
from rest_framework.response import Response

from weather_mpei.settings import BASE_DIR


def date_filter(request, model):
    date_from = request.query_params.get('date_from', default=None)
    date_to = request.query_params.get('date_to', default=None)
    query_set = model.objects.all()
    if date_from == "":
        date_from = None
    if date_to == "":
        date_to = None
    try:
        if date_from is not None or date_to is not None:
            if date_from is None:
                date_start = datetime(1900, 1, 1, 0, 0, 0)
                query_set = model.objects.filter(date__range=(date_start, date_to))
            elif date_to is None:
                date_now = datetime.now()
                query_set = model.objects.filter(date__range=(date_from, date_now))
            else:
                query_set = model.objects.filter(date__range=(date_from, date_to))
    except ValidationError as e:
        raise ParseError(e.error_list)
    return query_set.order_by('date').reverse()


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
    if length == 0:
        return Response({'labels': labels, 'values': values})

    limit = int(length / 40)
    if limit != 0:
        for i in range(40):
            offset = i * limit + limit
            if offset >= length:
                offset = length - 1
            current_values = model.objects.filter(id__range=(ids[i * limit]['id'], ids[offset]['id'])).values(param,
                                                                                                              'date')
            temp_sum = 0
            for value in current_values:
                temp_sum += float(value[param])
            avg = temp_sum / len(current_values)

            labels.append(current_values[len(current_values) - 1]['date'].strftime('%d.%m.%Y %H:%M'))
            values.append(avg)
    else:
        for i in range(length):
            current_value = model.objects.filter(id=ids[i]).values(param, 'date')
            labels.append(current_value['date'].strftime('%d.%m.%Y %H:%M'))
            values.append(current_value[param])

    return Response({'labels': labels, 'values': values})


def download_csv_data(request, model, filepath):
    query_set = date_filter(request, model)
    headers = [str(data.name) for data in query_set[0]._meta.fields]
    with open(filepath, 'w+') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        for obj in query_set:
            data = [str(obj.__getattribute__(d)) for d in headers]
            writer.writerow(data)


def download_xlsx_data(request, model):
    output = io.BytesIO()
    book = xlsxwriter.Workbook(output, {'in_memory': True})
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
    output.seek(0)
    return output


def download_file_response(model, filename, request, **kwargs):
    file_type = kwargs['file_type']
    if file_type not in ['csv', 'xlsx']:
        raise ParseError(detail='Неверный тип файла')
    temp_filename = datetime.now().strftime("f%d%m%Y%H%M%S%f")
    filepath = os.path.join(str(BASE_DIR), "weather_app", "files", temp_filename + "." + file_type)
    xlsx_data = None
    if file_type == 'csv':
        download_csv_data(request, model, filepath)
    if file_type == 'xlsx':
        xlsx_data = download_xlsx_data(request, model)

    content_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if file_type == 'csv':
        content_type = 'text/csv'
    response = HttpResponse(content_type=content_type)
    if file_type == 'csv':
        to_download = open(filepath, 'rb')
        response.write(base64.b64encode(to_download.read()).decode('utf-8'))
        to_download.close()
        os.remove(filepath)
    else:
        response.write(base64.b64encode(xlsx_data.read()).decode('utf-8'))
        xlsx_data.close()

    response['Content-Disposition'] = 'attachment; filename="' + filename + "." + file_type + '"'
    return response
