import { useLogin } from '../api/auth.api'
import { AuthLayout } from '../layouts'

export const LoginScreen = () => {
    const { mutateAsync: mutateLogin } = useLogin();

    return (
        <AuthLayout signIn={true} onSubmit={mutateLogin} />
    )
}