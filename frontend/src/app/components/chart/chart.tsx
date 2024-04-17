"use client"

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
    ChartData,
    Point, BarElement
} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';

import classes from "./chart.module.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement,
);

const options = {
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
    param: string | null,
    colors: string[],
    width: number,
    bar?: boolean
}

const Chart: FC<Props> = ({labels, values, param, colors, width, bar}) => {
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
    }, [ctx, width])

    gradient && colors && colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
    })

    const standardDataset = {
        label: param ?? '',
        data: values,
        backgroundColor: gradient,
        borderColor: [],
        borderWidth: 0,
    }

    const lineData: ChartData<"line", (number | Point | null)[], unknown> = {
        labels,
        datasets: [{
            ...standardDataset,
            fill: 'start',
            tension: 0.2,
            pointRadius: 1.5
        }]
    }

    const barData: ChartData<"bar", (number | Point | null)[], unknown> = {
        labels,
        datasets: [{
            ...standardDataset,
        }]
    }

    return (
        <div className={classes.chart}>
            {bar
                ? <Bar data={barData} options={options} className={classes.chart__canvas}/>
                : <Line data={lineData} options={options} className={classes.chart__canvas}/>
            }
        </div>
    );
};

export default Chart;
