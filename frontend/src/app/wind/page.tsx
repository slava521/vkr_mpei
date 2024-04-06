import TablePage from "@/app/pages/tablePage/tablePage";
import {WIND_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <TablePage tableCols={WIND_TABLE_COLS} tableData={[]} title='Таблица метеорологических данных'/>
    );
};

export default Page;