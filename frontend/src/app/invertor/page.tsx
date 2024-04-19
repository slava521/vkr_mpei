import {Suspense} from "react";

import TablePage from "@/app/components/pages/tablePage/tablePage";
import {INVERTOR_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <Suspense>
            <TablePage tableCols={INVERTOR_TABLE_COLS} endpoint='invertor' title='Таблица метеорологических данных'/>
        </Suspense>
    );
};

export default Page;
