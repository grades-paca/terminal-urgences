import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return useMutation({
        mutationFn: async ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => {
            const res = await fetch(API_URL + '/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok)
                throw new Error(
                    'Identifiants incorrects. Veuillez vérifier votre nom d’utilisateur et votre mot de passe.'
                );

            const data = await res.json();
            localStorage.setItem('jwt', data.token);
            return data;
        },
        onSuccess: () => {
            if (location.pathname === '/') {
                window.location.reload();
            } else {
                navigate('/');
            }
        },
        onError: (err) => {
            console.error('Échec du login :', err);
        },
    });
};
