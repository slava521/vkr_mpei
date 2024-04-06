import React, {FC} from 'react';
import classes from "./table.module.scss";
import {TableCols, TableData} from '@/app/shared/types/types';

type Props = {
    cols: TableCols
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
                    <th className={`${classes.table__col} ${classes.table__col__header}`}>
                        {col.id}
                        <div className={classes.table__col__header__description}>
                            {col.description}
                        </div>
                    </th>
                ))}
            </tr>
            {data.map((row) => (
                <tr className={classes.table__row}>
                    <td className={classes.table__col}>{row.id}</td>
                    <td className={classes.table__col}>{row.date}</td>
                    {cols.map((col)=>(
                        <td className={classes.table__col}>{row[col.id]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;