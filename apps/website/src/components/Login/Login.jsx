import LoginForm from '@components/LoginForm';
import useLoginMutation from './useLoginMutation.hook';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@contexts/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const login = useLoginMutation();
    const { onAuthenticate } = useAuth();
    const [searchParams] = useSearchParams();
    const referrer = searchParams.get('referrer');
    const redirectionLink = referrer ?? '/';

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: async ({ token, refreshToken }) => {
                await onAuthenticate({ accessToken: token, refreshToken });
                navigate(redirectionLink, { replace: true });
            },
        });
    };

    return <LoginForm onSubmit={onSubmit} isLoading={login.isLoading} />;
};

export default Login;
