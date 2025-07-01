import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_API_URL;
const getToken = () => localStorage.getItem('jwt');

export const useMe = () => {
    const token = localStorage.getItem('jwt');

    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const token = getToken();
            if (!token) {
                throw new Error('Non authentifié');
            }

            const res = await fetch(API_URL + '/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                localStorage.removeItem('jwt');
                throw new Error('Utilisateur non valide');
            }

            return res.json();
        },
        enabled: !!token,
        staleTime: 60_000,
        retry: false,
    });
};
