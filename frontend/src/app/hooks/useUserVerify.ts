import {useAppSelector} from "@/lib/hooks";
import {userAPI} from "@/lib/services/UserService";

export const useUserVerify = () => {
    const {access} = useAppSelector(state => state.userReducer)
    const {isLoading, error} = userAPI.useVerifyUserQuery({token: access})
    return [!isLoading && !error, isLoading]
}