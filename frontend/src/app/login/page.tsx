import AuthPage from "@/app/components/pages/authPage/authPage";
import {InputsType} from "@/app/shared/types/types";

const INPUTS: InputsType = [
    {
        label: 'Имя пользователя',
        name: 'username-field',
        type: 'text',
    },
    {
        label: 'Пароль',
        name: 'password',
        type: 'password',
    },
]

const Page = () => {
    return (
        <AuthPage
            title='Авторизация'
            inputs={INPUTS}
            submitName='Войти'
            link='/reg'
            linkName='Зарегистрироваться'
        />
    );
};

export default Page;