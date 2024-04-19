import {Suspense} from "react";

import TablePage from "@/app/components/pages/tablePage/tablePage";
import {METEO_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <Suspense>
            <TablePage tableCols={METEO_TABLE_COLS} endpoint='meteo' title='Таблица метеорологических данных'/>
        </Suspense>
    );
};

export default Page;
