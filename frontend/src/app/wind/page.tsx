import TablePage from "@/app/components/pages/tablePage/tablePage";
import {WIND_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <TablePage tableCols={WIND_TABLE_COLS} endpoint='wind' title='Таблица метеорологических данных'/>
    );
};

export default Page;
