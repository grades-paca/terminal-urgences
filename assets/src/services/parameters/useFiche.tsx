import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Fiche } from '@interfaces/Fiche.ts';

const API_URL = import.meta.env.VITE_API_URL;

export const useFiches = () => {
    return useQuery<Fiche[]>({
        queryKey: ['fiches'],
        queryFn: async () => {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${API_URL}/fiches`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch fiches');
            return res.json();
        },
    });
};

export const useCreateFiche = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fiche: Fiche) => {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${API_URL}/fiches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fiche),
            });
            if (!res.ok) throw new Error('Failed to create fiche');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fiches'] });
        },
    });
};

export const useUpdateFiche = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fiche: Partial<Fiche> & { id: string }) => {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${API_URL}/fiches/${fiche.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fiche),
            });
            if (!res.ok) throw new Error('Failed to update fiche');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fiches'] });
        },
    });
};
