from datetime import datetime


def date_filter(request, model):
    date_from = request.query_params.get('date_from', default=None)
    date_to = request.query_params.get('date_to', default=None)

    if date_from is not None or date_to is not None:
        if date_from is None:
            date_start = datetime(1900, 1, 1, 0,0,0)
            return model.objects.filter(date__range=(date_start, date_to))
        if date_to is None:
            date_now = datetime.now()
            return model.objects.filter(date__range=(date_from, date_now))
        return model.objects.filter(date__range=(date_from, date_to))
    return model.objects.all()