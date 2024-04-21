import { useRegister } from '../api/auth.api';
import { AuthLayout } from '../layouts'

export const RegisterScreen = () => {
    const { mutateAsync: mutateRegister } = useRegister();
    return (
        <AuthLayout signIn={false} onSubmit={mutateRegister} />
    )
}