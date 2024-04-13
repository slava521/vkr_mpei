"use client"

import classes from "./chart.module.scss";
import {FC, useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    type ChartOptions, ChartData, Point,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
                stepSize: 20,
                font: {
                    size: 10
                }
            }
        },
        y: {
            ticks: {
                font: {
                    size: 10
                }
            }
        }
    }
}

type Props = {
    labels: string[],
    values: number[],
    param: string,
    colors: string[],
    width: number
}

const Chart: FC<Props> = ({labels, values, param, colors, width}) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [gradient, setGradient] = useState<CanvasGradient | undefined>(undefined)

    useEffect(() => {
        setCanvas(document.createElement(`canvas`));
    }, [])

    useEffect(() => {
        canvas && setCtx(canvas.getContext("2d"));
    }, [canvas])

    useEffect(() => {
        ctx && setGradient(ctx.createLinearGradient(0, 0, width, 0));
    }, [ctx])

    gradient && colors && colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
    })

    const data: ChartData<"line", (number | Point | null)[], unknown> = {
        labels,
        datasets: [{
            fill: true,
            label: param,
            data: values,
            backgroundColor: gradient,
            borderColor: [],
            borderWidth: 0,
            tension: 0.2,
            pointRadius: 1
        }]
    }

    return (
        <div className={classes.chart}>
            <Line data={data} options={options} className={classes.chart__canvas}/>
        </div>
    );
};

export default Chart;