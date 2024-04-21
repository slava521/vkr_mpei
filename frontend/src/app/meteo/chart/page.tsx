import {Suspense} from "react";

import ChartPage from "@/app/components/pages/chartPage/chartPage";
import LoadingPage from "@/app/components/pages/loadingPage/loadingPage";
import {METEO_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <ChartPage title='График метеорологических параметров' params={METEO_TABLE_COLS} endpoint='meteo'/>
        </Suspense>
    );
};

export default Page;
