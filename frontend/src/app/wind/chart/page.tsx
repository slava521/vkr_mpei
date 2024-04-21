import {Suspense} from "react";

import ChartPage from "@/app/components/pages/chartPage/chartPage";
import LoadingPage from "@/app/components/pages/loadingPage/loadingPage";
import {WIND_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <ChartPage title={'График параметров с ветряного модуля'} params={WIND_TABLE_COLS} endpoint='wind'/>
        </Suspense>
    );
};

export default Page;
