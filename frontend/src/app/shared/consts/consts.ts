import {Links, Params} from "@/app/shared/types/types";

export const METEO_TABLE_COLS:Params = [
    {
        id: 'TA',
        description: 'среднее значение температуры за 1 минуту (°C)',
    },
    {
        id: 'DP',
        description: 'точка росы (°C)',
    },
    {
        id: 'WC',
        description: 'охлаждение ветром (°C)',
    },
    {
        id: 'RH',
        description: 'относительная влажность (%)',
    },
    {
        id: 'PA',
        description: 'атмосферное давление (mm Hg)',
    },
    {
        id: 'PR',
        description: 'количество жидких осадков мгновенное значение (мм)',
    },
    {
        id: 'PR1H',
        description: 'количество жидких осадков сумма за 1 час (мм)',
    },
    {
        id: 'PR24H',
        description: 'количество жидких осадков сумма за сутки (мм)',
    },
    {
        id: 'SR_1M',
        description: 'данные от CMP6 установленного параллельно относительно поверхности земли (Вт/м²) среднее значение за 1 минуту',
    },
    {
        id: 'SR_1D',
        description: 'данные от CMP6 установленного параллельно относительно поверхности земли (Вт/м²) среднее значение за 24 часа',
    },
    {
        id: 'SR_45_1M',
        description: 'данные от CMP6 установленного под 45 градусов относительно поверхности земли (Вт/м²) среднее значение за 1 минуту',
    },
    {
        id: 'SR_45_1D',
        description: 'данные от CMP6 установленного под 45 градусов относительно поверхности земли (Вт/м²) среднее значение за 24 часа',
    },
    {
        id: 'SD_1H',
        description: 'данные от CMP6 установленного под 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 1 час',
    },
    {
        id: 'SD_1D',
        description: 'данные от CMP6 установленного под 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 24 часа',
    },
    {
        id: 'SD_45_1H',
        description: 'данные от CMP6 установленного под 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 1 час',
    },
    {
        id: 'SD_45_1D',
        description: 'данные от CMP6 установленного под 45 градусов относительно поверхности земли (Вт/м²) суммарное значение за 24 часа',
    }
]

export const WIND_TABLE_COLS:Params = [
    {
        id: 'WS1AVG',
        description: 'скорость ветра (м/с) за 3 сек',
    },
    {
        id: 'WD1AVG',
        description: 'направление ветра (град) за 3 сек',
    },
    {
        id: 'WS1MIN2',
        description: 'скорость ветра (м/с) минимальное значение за 2 минуты',
    },
    {
        id: 'WS1AVG2',
        description: 'скорость ветра (м/с) среднее значение за 2 минуты',
    },
    {
        id: 'WS1MAX2',
        description: 'скорость ветра (м/с) максимальное значение за 2 минуты',
    },
    {
        id: 'WD1MIN2',
        description: 'направление ветра (град) минимальное значение за 2 минуты',
    },
    {
        id: 'WD1AVG2',
        description: 'направление ветра (град) среднее значение за 2 минуты',
    },
    {
        id: 'WD1MAX2',
        description: 'направление ветра (град) максимальное значение за 2 минуты',
    },
    {
        id: 'WS1MIN10',
        description: 'скорость ветра (м/с) минимальное значение за 10 минут',
    },
    {
        id: 'WS1AVG10',
        description: 'скорость ветра (м/с) среднее значение за 10 минут',
    },
    {
        id: 'WS1MAX10',
        description: 'скорость ветра (м/с) максимальное значение за 2 минуты',
    },
    {
        id: 'WD1MIN10',
        description: 'направление ветра (град) минимальное значение за 10 минут',
    },
    {
        id: 'WD1AVG10',
        description: 'направление ветра (град) среднее значение за 10 минут',
    },
    {
        id: 'WD1MAX10',
        description: 'направление ветра (град) максимальное значение за 10 минут',
    }
]

export const INVERTOR_TABLE_COLS:Params = [
    {
        id: 'pv1_input_power',
        description: 'входная мощность pv1 (Вт) за 1 сек',
    },
    {
        id: 'pv1_voltage',
        description: 'напряжение pv1 (В) за 1 сек',
    },
    {
        id: 'pv1_current',
        description: 'ток pv1 (А) за 1 сек',
    },
    {
        id: 'pv2_input_power',
        description: 'входная мощность pv2 (Вт) за 1 сек',
    },
    {
        id: 'pv2_voltage',
        description: 'напряжение pv2 (В) за 1 сек',
    },
    {
        id: 'pv2_current',
        description: 'ток pv2 (А) за 1 сек',
    },
    {
        id: 'grid_voltage',
        description: 'напряжение сети (В) за 1 сек',
    },
    {
        id: 'grid_current',
        description: 'ток сети (А) за 1 сек',
    },
    {
        id: 'grid_frequency',
        description: 'частота сети (Гц) за 1 сек',
    },
    {
        id: 'output_power',
        description: 'выходная мощность (Вт) за 1 сек',
    },
    {
        id: 'energy_today',
        description: 'энергия сегодня (кВт*ч) за 1 сек',
    },
    {
        id: 'energy_total',
        description: 'общая энергия (кВт*ч) за 1 сек',
    }
]

export const LINKS: Links = [
    {
        name: 'Главная',
        mainLink: '/'
    },
    {
        name: 'Данные с метеостанции',
        mainLink: '/meteo',
        graphLink: '/meteo/chart'
    },
    {
        name: 'Данные с ветряного модуля',
        mainLink: '/wind',
        graphLink: '/wind/chart'
    },
    {
        name: 'Данные с инвертора',
        mainLink: '/invertor',
        graphLink: '/invertor/chart'
    }
]

export const TEMPERATURE_COLORS = ['#F5C05A', '#EB88B1', '#B965E4', '#8c7ede']
export const PRESSURE_COLORS = [...TEMPERATURE_COLORS].reverse()
export const WIND_SPEED_COLORS = ['#76FD1F', '#00C28F', '#167D87']
export const HUMIDITY_COLORS = [...WIND_SPEED_COLORS].reverse()
