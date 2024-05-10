'use client'

import React, {FC} from 'react';

import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {Params, TableData} from '@/app/shared/types/types';
import {formatDate} from "@/app/shared/utils/utils";

import classes from "./table.module.scss";

type Props = {
    cols: Params
    loading: boolean,
    data?: TableData
    contentCount?: number,
}

const Table: FC<Props> = ({cols, loading, data, contentCount}) => {
    const searchParams = useSearchParams()
    const orderBy = searchParams.get('order_by') || 'date'
    const ascending = searchParams.get('ascending') || 'false'

    const {replace} = useRouter()
    const pathname = usePathname()

    if (loading) {
        return <div>Загрузка...</div>
    }

    if (contentCount === 0) {
        return <div>Информация по указанным данным отсутствует.</div>
    }

    const headers = [
        {
            id: 'id',
            description: ''
        },
        {
            id: 'date',
            description: ''
        },
        ...cols
    ]

    const handleOrderBy = (id: string) => {
        const newSearchParams = new URLSearchParams(searchParams)
        if (id === orderBy) {
            newSearchParams.set('ascending', ascending === 'true' ? 'false' : 'true')
        }
        else {
            newSearchParams.set('order_by', id)
            newSearchParams.delete('ascending')
        }
        replace(`${pathname}?${newSearchParams.toString()}`)
    }

    return (
        <table className={classes.table}>
            <tbody>
                <tr className={classes.table__row}>
                    {headers.map((col) => (
                        <th key={col.id} className={`${classes.table__col} ${classes.table__col__header}`}>
                            <button className={classes.table__col__header__button} onClick={()=>handleOrderBy(col.id)}>
                                {col.id === 'id' ? '№' : col.id === 'date' ? 'Дата' : col.id}
                                {orderBy === col.id &&
                                    <img
                                        src="/triangle.svg"
                                        alt="Треугольник"
                                        className={`${classes.table__col__header__orderBy_img} ${
                                            ascending==='true' ? classes.table__col__header__orderBy_img__ascending : ''
                                        }`}
                                    />
                                }
                            </button>
                            {col.description && <span className={classes.table__col__header__description}>
                                {col.description}
                            </span>}
                        </th>
                    ))}
                </tr>
                {data && data.map((row) => {
                    const date = new Date(row.date)
                    return (
                        <tr key={row.id} className={classes.table__row}>
                            <td className={classes.table__col}>{row.id}</td>
                            <td className={classes.table__col}>{formatDate(date, true)}</td>
                            {cols.map((col) => (
                                <td key={col.id} className={classes.table__col}>{row[col.id]}</td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default Table;
