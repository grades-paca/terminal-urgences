import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Fiche } from '@interfaces/Fiche.ts';
import type {
    ApiPlatformError,
    ApiPlatformResponse,
    HydraCollection,
} from '@interfaces/HydraCollection.ts';

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('jwt');

export const useFiches = () => {
    const token = getToken();

    return useQuery<HydraCollection<Fiche>>({
        queryKey: ['fiches'],
        queryFn: async () => {
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

export type FichePayload = Fiche & { __method: 'POST' | 'PATCH' };

async function submitFiche(
    fiche: FichePayload
): Promise<ApiPlatformResponse<Fiche>> {
    const { __method, ...payload } = fiche;
    const token = getToken();

    const url =
        __method === 'PATCH'
            ? `${API_URL}/fiches/${fiche.id}`
            : `${API_URL}/fiches`;

    const headers = {
        'Content-Type':
            __method === 'PATCH'
                ? 'application/merge-patch+json'
                : 'application/ld+json',
        Authorization: `Bearer ${token}`,
    };

    const res = await fetch(url, {
        method: __method,
        headers,
        body: JSON.stringify(payload),
    });

    if (res.status === 422) {
        throw await res.json();
    }

    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
    }

    return res.json();
}

export const useFicheSubmit = ({
    onSuccess,
    onError,
    disableAutoRefetch = false,
}: {
    onSuccess?: (data: ApiPlatformResponse<Fiche>) => void;
    onError?: (error: ApiPlatformError | Error) => void;
    disableAutoRefetch?: boolean;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitFiche,
        onSuccess: (data) => {
            if (!disableAutoRefetch) {
                queryClient.invalidateQueries({ queryKey: ['fiches'] });
            }
            onSuccess?.(data);
        },
        onError,
    });
};
