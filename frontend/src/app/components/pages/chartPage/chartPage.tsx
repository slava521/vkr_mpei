"use client"

import Container from "@/app/components/ui/container/container";
import React, {FC} from "react";
import classes from './chartPage.module.scss';
import Select from "@/app/components/ui/select/select";
import Input from "@/app/components/ui/input/input";
import {Params} from "@/app/shared/types/types";
import Checkbox from "@/app/components/ui/checkbox/checkbox";
import RadioButton from "@/app/components/ui/radioButton/radioButton";
import Button from "@/app/components/ui/button/button";
import Chart from "@/app/components/chart/chart";

type Props = {
    title: string,
    params: Params
}

const handleParamClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
}

const ChartPage: FC<Props> = ({title, params}) => {
    const options = params.map(param => param.id)

    return (
        <Container title={title}>
            <div className={classes.chartPage}>
                <div className={classes.chartPage__sidebar}>
                    <div></div>
                    {/*TODO Сделать сообщение ошибки*/}
                    <div className={classes.chartPage__sidebar__body}>
                        <div className={classes.chartPage__sidebar__text}>
                            Введите даты и выберите параметр:
                        </div>
                        <form className={classes.chartPage__sidebar__form}>
                            <Input label={'Начальная дата'} inputType={'datetime-local'} name={'date_from'}/>
                            <Input label={'Конечная дата'} inputType={'datetime-local'} name={'date_from'}/>
                            <div className={classes.chartPage__sidebar__form__param}>
                                <div className={classes.chartPage__sidebar__form__param__comment}>
                                    Введите <span
                                        className={classes.chartPage__sidebar__form__param__link}
                                        onClick={handleParamClick}
                                    >
                                        параметр
                                    </span> из таблицы
                                </div>
                                <Select name={'param'} options={options}/>
                            </div>
                            <Checkbox label='Построить график посекундно' name='formCheckbox'/>
                            <div className={classes.chartPage__sidebar__form__radio}>
                                <div>Вид графика:</div>
                                <RadioButton label='Линейный' name='chartType' value='line' checked/>
                                <RadioButton label='Столбчатый' name='chartType' value='bar'/>
                            </div>
                            <Button buttonType='submit' text='Построить график' right/>
                        </form>
                    </div>
                </div>
                <div className={classes.chartPage__main}>
                    <div className={classes.chartPage__main__chart}>
                        <div
                            className={`${classes.chartPage__main__chart__header} ${
                                true ? classes.chartPage__main__chart__header__active : '' // TODO добавить обработку
                            }`}
                        >
                            График параметра
                        </div>
                        <div className={classes.chartPage__main__chart__bg}>
                            <Chart labels={[]} values={[]} param={''} colors={[]} width={700}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ChartPage;