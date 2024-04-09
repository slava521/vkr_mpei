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


def main_param_json(model, param, **kwargs):
    range_type = kwargs['type']
    allowed_types = ['hour', 'day', 'week']
    if range_type not in allowed_types:
        raise ParseError(detail='Неверный тип')

    date_to = datetime(2021, 12, 21, 0, 0, 0)
    # date_to = datetime.now()
    date_from = None

    if range_type == 'hour':
        date_from = datetime(2021, 12, 20, 23, 0, 0)
        # date_from = date_to - timedelta(hours=1)
    if range_type == 'day':
        date_from = datetime(2021, 12, 20, 0, 0, 0)
        # date_from = date_to - timedelta(days=1)
    if range_type == 'week':
        date_from = datetime(2021, 12, 14, 0, 0, 0)
        # date_from = date_to - timedelta(weeks=1)

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
