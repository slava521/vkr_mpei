# Generated by Django 5.0.4 on 2024-04-19 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invertor',
            name='energy_today',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Энергия сегодня (кВт*ч) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='energy_total',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Общая энергия (кВт*ч) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='grid_current',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Ток сети (А) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='grid_frequency',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Частота сети (Гц) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='grid_voltage',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Напряжение сети (В) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='output_power',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Выходная мощность (Вт) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='pv1_current',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Ток pv1 (А) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='pv1_input_power',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Входная мощность pv1 (Вт) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='pv1_voltage',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Напряжение pv1 (В) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='pv2_current',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Ток pv2 (А) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='pv2_input_power',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Входная мощность pv2 (Вт) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='invertor',
            name='pv2_voltage',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Напряжение pv2 (В) за 1 сек'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='DP',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Точка росы, C'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='PA',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Атмосферное давление, mm Hg'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='PR',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Количество жидких осадков мгновенное значение, мм'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='PR1H',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Количество жидких осадков сумма за 1 час, мм'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='PR24H',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Количество жидких осадков сумма за сутки, мм'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='RH',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Относительная влажность, %'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SD_1D',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 24 часа'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SD_1H',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 1 час'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SD_45_1D',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 24 часа'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SD_45_1H',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 1 час'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SR_1D',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного параллельно относительно поверхности земли (Вт/м²) среднее значение за 24 часа'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SR_1M',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного параллельно относительно поверхности земли (Вт/м²) среднее значение за 1 минуту'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SR_45_1D',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) среднее значение за 24 часа'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='SR_45_1M',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Данные от CMP6 установленного 45 градусов относительно поверхности земли (Вт/м²) среднее значение за 1 минуту'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='TA',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Среднее значение температуры за 1 минуту, C'),
        ),
        migrations.AlterField(
            model_name='meteodata',
            name='WC',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Охлаждение ветром , C'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1AVG',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) за 3 сек'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1AVG10',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) среднее значение за 10 минут'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1AVG2',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) среднее значение за 2 минуты'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1MAX10',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) максимальное значение за 10 минут'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1MAX2',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) максимальное значение за 2 минуты'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1MIN10',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) минимальное значение за 10 минут'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WD1MIN2',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Направление ветра (град) минимальное значение за 2 минуты'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1AVG',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Cкорость ветра (м/с) за 3 сек'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1AVG10',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Скорость ветра (м/с) среднее значение за 10 минут'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1AVG2',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Cкорость ветра (м/с) среднее значение за 2 минуты'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1MAX10',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Скорость ветра (м/с) максимальное значение за 2 минуты'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1MAX2',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Cкорость ветра (м/с) максимальное значение за 2 минуты'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1MIN10',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Cкорость ветра (м/с) минимальное значение за 10 минут'),
        ),
        migrations.AlterField(
            model_name='winddata',
            name='WS1MIN2',
            field=models.FloatField(blank=True, default='0', max_length=64, null=True, verbose_name='Cкорость ветра (м/с) минимальное значение за 2 минуты'),
        ),
    ]
