from django.db import models


class MeteoData(models.Model):
    date = models.DateTimeField(auto_now=False, auto_now_add=False, verbose_name="Дата")
    TA = models.FloatField(max_length=64, null=True, blank=True, default="0",
                           verbose_name="Среднее значение температуры за 1 минуту, C")
    DP = models.FloatField(max_length=64, null=True, blank=True, default="0", verbose_name="Точка росы, C")
    WC = models.FloatField(max_length=64, null=True, blank=True, default="0", verbose_name="Охлаждение ветром , C")
    RH = models.FloatField(max_length=64, null=True, blank=True, default="0", verbose_name="Относительная влажность, %")
    PA = models.FloatField(max_length=64, null=True, blank=True, default="0",
                           verbose_name="Атмосферное давление, mm Hg")
    PR = models.FloatField(max_length=64, null=True, blank=True, default="0",
                           verbose_name="Количество жидких осадков мгновенное значение, мм")
    PR1H = models.FloatField(max_length=64, null=True, blank=True, default="0",
                             verbose_name="Количество жидких осадков сумма за 1 час, мм")
    PR24H = models.FloatField(max_length=64, null=True, blank=True, default="0",
                              verbose_name="Количество жидких осадков сумма за сутки, мм")
    SR_1M = models.FloatField(max_length=64, null=True, blank=True, default="0",
                              verbose_name="Данные от CMP6 установленного параллельно относительно поверхности земли (Вт/м²) среднее значение за 1 минуту")
    SR_1D = models.FloatField(max_length=64, null=True, blank=True, default="0",
                              verbose_name="Данные от CMP6 установленного параллельно относительно поверхности земли (Вт/м²) среднее значение за 24 часа")
    SR_45_1M = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) среднее значение за 1 минуту")
    SR_45_1D = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) среднее значение за 24 часа")
    SD_1H = models.FloatField(max_length=64, null=True, blank=True, default="0",
                              verbose_name="Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 1 час")
    SD_1D = models.FloatField(max_length=64, null=True, blank=True, default="0",
                              verbose_name="Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 24 часа")
    SD_45_1H = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 1 час")
    SD_45_1D = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 24 часа"
                                 )

    def __str__(self):
        return f'Данные с метеостанции от {self.date.strftime("%H-%M-%S-%d-%m-%Y")}'

    class Meta:
        verbose_name = "Данные с метеостанции"
        verbose_name_plural = "Данные с метеостанции"


# Данные с ветряного модуля
class WindData(models.Model):
    date = models.DateTimeField(auto_now=False, auto_now_add=False, verbose_name="Дата")
    WS1AVG = models.FloatField(max_length=64, null=True, blank=True, default="0",
                               verbose_name="Cкорость ветра (м/с) за 3 сек")
    WD1AVG = models.FloatField(max_length=64, null=True, blank=True, default="0",
                               verbose_name="Направление ветра (град) за 3 сек")
    WS1MIN2 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                verbose_name="Cкорость ветра (м/с) минимальное значение за 2 минуты")
    WS1AVG2 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                verbose_name="Cкорость ветра (м/с) среднее значение за 2 минуты")
    WS1MAX2 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                verbose_name="Cкорость ветра (м/с) максимальное значение за 2 минуты")
    WD1MIN2 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                verbose_name="Направление ветра (град) минимальное значение за 2 минуты")
    WD1AVG2 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                verbose_name="Направление ветра (град) среднее значение за 2 минуты")
    WD1MAX2 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                verbose_name="Направление ветра (град) максимальное значение за 2 минуты")
    WS1MIN10 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Cкорость ветра (м/с) минимальное значение за 10 минут")
    WS1AVG10 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Скорость ветра (м/с) среднее значение за 10 минут")
    WS1MAX10 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Скорость ветра (м/с) максимальное значение за 2 минуты")
    WD1MIN10 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Направление ветра (град) минимальное значение за 10 минут")
    WD1AVG10 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Направление ветра (град) среднее значение за 10 минут")
    WD1MAX10 = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                 verbose_name="Направление ветра (град) максимальное значение за 10 минут")

    def __str__(self):
        return f'Данные с ветряного модуля от {self.date.strftime("%H-%M-%S-%d-%m-%Y")}'

    class Meta:
        verbose_name = "Данные с ветряного модуля"
        verbose_name_plural = "Данные с ветряного модуля"


# Данные с инвертора
class Invertor(models.Model):
    date = models.DateTimeField(auto_now=False, auto_now_add=False, verbose_name="Дата")
    pv1_input_power = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                        verbose_name="Входная мощность pv1 (Вт) за 1 сек")
    pv1_voltage = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                    verbose_name="Напряжение pv1 (В) за 1 сек")
    pv1_current = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                    verbose_name="Ток pv1 (А) за 1 сек")
    pv2_input_power = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                        verbose_name="Входная мощность pv2 (Вт) за 1 сек")
    pv2_voltage = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                    verbose_name="Напряжение pv2 (В) за 1 сек")
    pv2_current = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                    verbose_name="Ток pv2 (А) за 1 сек")
    grid_voltage = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                     verbose_name="Напряжение сети (В) за 1 сек")
    grid_current = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                     verbose_name="Ток сети (А) за 1 сек")
    grid_frequency = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                       verbose_name="Частота сети (Гц) за 1 сек")
    output_power = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                     verbose_name="Выходная мощность (Вт) за 1 сек")
    energy_today = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                     verbose_name="Энергия сегодня (кВт*ч) за 1 сек")
    energy_total = models.FloatField(max_length=64, null=True, blank=True, default="0",
                                     verbose_name="Общая энергия (кВт*ч) за 1 сек")

    def __str__(self):
        return f'Данные с инвертора от {self.date.strftime("%H-%M-%S-%d-%m-%Y")}'

    class Meta:
        verbose_name = "Данные с инвертора"
        verbose_name_plural = "Данные с инвертора"
