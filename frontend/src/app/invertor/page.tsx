import {Suspense} from "react";

import LoadingPage from "@/app/components/pages/loadingPage/loadingPage";
import TablePage from "@/app/components/pages/tablePage/tablePage";
import {INVERTOR_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <TablePage tableCols={INVERTOR_TABLE_COLS} endpoint='invertor' title='Таблица метеорологических данных'/>
        </Suspense>
    );
};

export default Page;
