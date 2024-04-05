import React, {FC} from 'react';
import Container from "@/app/components/ui/container/container";
import classes from "./tablePage.module.scss";
import Input from "@/app/components/ui/input/input";

type Props = {
    title: string,
}

const TablePage:FC<Props> = ({title}) => {
    return (
        <Container title={title}>
            <form className={classes.tableForm}>
                <div className={classes.tableForm__inputs}>
                    <Input label='Начальная дата:' inputType='datetime-local'/>
                    <Input label='Конечная дата:' inputType='datetime-local'/>
                </div>
            </form>
        </Container>
    );
};

export default TablePage;