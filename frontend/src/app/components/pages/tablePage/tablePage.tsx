import React, {FC} from 'react';
import Container from "@/app/components/ui/container/container";
import classes from "./tablePage.module.scss";
import Input from "@/app/components/ui/input/input";
import Button from "@/app/components/ui/button/button";
import Table from "@/app/components/table/table";
import {TableCols, TableData} from "@/app/shared/types/types";

type Props = {
    title: string,
    tableCols: TableCols
    tableData: TableData
}

const TablePage:FC<Props> = ({title, tableCols, tableData}) => {
    return (
        <Container title={title}>
            <form className={classes.tableForm}>
                <div className={classes.tableForm__inputs}>
                    <Input label='Начальная дата:' inputType='datetime-local'/>
                    <Input label='Конечная дата:' inputType='datetime-local'/>
                </div>
                <Button buttonType='reset' text='Сброс'/>
                <Button buttonType='submit' text='Поиск'/>
            </form>
            <Table cols={tableCols} data={tableData}/>
        </Container>
    );
};

export default TablePage;