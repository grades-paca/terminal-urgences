import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import type {Fiche} from '@interfaces/Fiche.ts';
import type {ApiPlatformError, HydraCollection, UseCreateOptions} from "@interfaces/HydraCollection.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const useFiches = () => {
    const token = localStorage.getItem('jwt');

    return useQuery<HydraCollection<Fiche>>({
        queryKey: ['fiches'],
        queryFn: async () => {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${API_URL}/fiches`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch fiches');

            const json: HydraCollection<Fiche> = await res.json();
            return json;
        },
        enabled: !!token,
    });
};

export const useCreateFiche = ({ onSuccess, onError } : UseCreateOptions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fiche: Fiche) => {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${API_URL}/fiches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fiche),
            });

            if (res.status === 422) {
                throw await res.json();
            }

            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }

            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['fiches'] });
            onSuccess?.(data);
        },
        onError: (error: ApiPlatformError | Error) => {
            onError?.(error);
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
