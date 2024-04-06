import TablePage from "@/app/components/pages/tablePage/tablePage";
import {METEO_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <TablePage tableCols={METEO_TABLE_COLS} tableData={[]} title='Таблица метеорологических данных'/>
    );
};

export default Page;