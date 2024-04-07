import ChartPage from "@/app/components/pages/chartPage/chartPage";
import {METEO_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <ChartPage title='График метеорологических параметров' params={METEO_TABLE_COLS}/>
    );
};

export default Page;