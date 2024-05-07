import { useFirebaseRegister } from '../api/auth.api';
import { AuthLayout } from '../layouts'

export const RegisterScreen = () => {
    const { isPending, mutateAsync: onSubmit } = useFirebaseRegister();
    return (
        <AuthLayout signIn={false} onSubmit={onSubmit} isLoading={isPending} />
    )
}