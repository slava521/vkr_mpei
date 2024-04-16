import React, {FC} from 'react';

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
    if (loading) {
        return <div>Загрузка...</div>
    }

    if (contentCount === 0) {
        return <div>Информация по указанным данным отсутствует.</div>
    }

    return (
        <table className={classes.table}>
            <tbody>
                <tr className={classes.table__row}>
                    <th className={`${classes.table__col} ${classes.table__col__header}`}>№</th>
                    <th className={`${classes.table__col} ${classes.table__col__header}`}>Дата</th>
                    {cols.map((col) => (
                        <th key={col.id} className={`${classes.table__col} ${classes.table__col__header}`}>
                            {col.id}
                            <div className={classes.table__col__header__description}>
                                {col.description}
                            </div>
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
