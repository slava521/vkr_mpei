import ChartPage from "@/app/components/pages/chartPage/chartPage";
import {INVERTOR_TABLE_COLS} from "@/app/shared/consts/consts";

const Page = () => {
    return (
        <ChartPage title='График параметров с инвертора' params={INVERTOR_TABLE_COLS} endpoint={'invertor'}/>
    );
};

export default Page;