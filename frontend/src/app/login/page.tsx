import AuthPage from "@/app/components/pages/authPage/authPage";
import {InputsType} from "@/app/shared/types/types";

const INPUTS: InputsType = [
    {
        placeholder: 'Имя пользователя',
        id: 'username-field',
        type: 'text',
    },
    {
        placeholder: 'Пароль',
        id: 'password',
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