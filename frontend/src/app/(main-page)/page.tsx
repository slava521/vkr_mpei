import MainChart from "@/app/components/mainChart/mainChart";
import Container from "@/app/components/ui/container/container";
import {HUMIDITY_COLORS, PRESSURE_COLORS, TEMPERATURE_COLORS, WIND_SPEED_COLORS} from "@/app/shared/consts/consts";

import classes from "./page.module.scss";

export default function Home() {
    return (
        <Container title='Информация о погоде'>
            <div className={classes.mainCharts}>
                <MainChart
                    title='Среднее значение температуры за 1 минуту (°C)'
                    colors={TEMPERATURE_COLORS}
                    endpoint='meteo'
                    param='TA'
                />
                <MainChart
                    title='Атмосферное давление (mm Hg)'
                    colors={PRESSURE_COLORS}
                    endpoint='meteo'
                    param='PA'
                />
                <MainChart
                    title='Скорость ветра (м/с) за 3 сек'
                    colors={WIND_SPEED_COLORS}
                    endpoint='wind'
                    param={'WS1AVG'}
                />
                <MainChart
                    title='Относительная влажность (%)'
                    colors={HUMIDITY_COLORS}
                    endpoint='meteo'
                    param={'RH'}
                />
            </div>
        </Container>
    );
}
