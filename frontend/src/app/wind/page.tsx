import {Suspense} from "react";

import TablePage from "@/app/components/pages/tablePage/tablePage";
import {WIND_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <Suspense>
            <TablePage tableCols={WIND_TABLE_COLS} endpoint='wind' title='Таблица метеорологических данных'/>
        </Suspense>
    );
};

export default Page;
