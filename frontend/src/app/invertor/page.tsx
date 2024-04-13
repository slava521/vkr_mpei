import TablePage from "@/app/components/pages/tablePage/tablePage";
import {INVERTOR_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <TablePage tableCols={INVERTOR_TABLE_COLS} endpoint='invertor' title='Таблица метеорологических данных'/>
    );
};

export default Page;