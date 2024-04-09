from datetime import datetime, timedelta

from rest_framework.exceptions import ParseError
from rest_framework.response import Response


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

        labels.append(current_values[len(current_values)-1]['date'].strftime('%d.%m.%Y %H:%M'))
        values.append(avg)

    return Response({'labels': labels, 'values': values})
