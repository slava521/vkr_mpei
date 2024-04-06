import {InputsType} from "@/app/shared/types/types";
import AuthPage from "@/app/components/pages/authPage/authPage";


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
    {
        placeholder: 'Повтор пароля',
        id: 'password',
        type: 'password_repeat',
    },
]

const Page = () => {
    return (
        <AuthPage
            title='Регистрация'
            inputs={INPUTS}
            submitName='Зарегистрироваться'
            link='/login'
            linkName='Есть аккаунт?'
        />
    );
};

export default Page;