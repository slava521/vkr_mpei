import React, {FC} from 'react';
import classes from "./table.module.scss";
import {Params, TableData} from '@/app/shared/types/types';

type Props = {
    cols: Params
    data: TableData
}

const Table: FC<Props> = ({cols, data}) => {

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
            {data.map((row) => (
                <tr key={row.id} className={classes.table__row}>
                    <td className={classes.table__col}>{row.id}</td>
                    <td className={classes.table__col}>{row.date}</td>
                    {cols.map((col)=>(
                        <td key={col.id} className={classes.table__col}>{row[col.id]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;