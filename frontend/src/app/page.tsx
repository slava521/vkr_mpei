import Container from "@/app/components/ui/container/container";
import classes from "./page.module.scss";
import MainChart from "@/app/components/mainChart/mainChart";

export default function Home() {
    return (
        <Container title='Информация о погоде'>
            <div className={classes.mainCharts}>
                <MainChart title='Среднее значение температуры за 1 минуту (°C)'/>
                <MainChart title='Атмосферное давление (mm Hg)'/>
            </div>
            <div className={classes.mainCharts}>
                <MainChart title='Скорость ветра (м/с) за 3 сек'/>
                <MainChart title='Относительная влажность (%)'/>
            </div>
        </Container>
    );
}
