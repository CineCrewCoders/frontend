import { useFirebaseLogin } from '../api/auth.api'
import { AuthLayout } from '../layouts'

export const LoginScreen = () => {
    const { mutateAsync: mutateLogin, isPending } = useFirebaseLogin();

    return (
        <AuthLayout signIn={true} onSubmit={mutateLogin} isLoading={isPending} />
    )
}