import { useMe } from '@features/auth/useMe';
import { View } from '@interfaces/View';
import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_API_URL;

export const useConfigView = () => {
    const { data: user, isLoading } = useMe();

    return useQuery<View[]>({
        queryKey: ['configView'],
        queryFn: async () => {
            const token = localStorage.getItem('jwt');

            const res = await fetch(API_URL + '/config/view', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                return [];
                // throw new Error('Utilisateur non valide');
            }

            return res.json();
        },
        enabled: !isLoading && !!user,
    });
};
