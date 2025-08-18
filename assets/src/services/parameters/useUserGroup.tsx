import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
    ApiPlatformError,
    ApiPlatformResponse,
    HydraCollection,
} from '@interfaces/HydraCollection.ts';
import type { UserGroup } from '@interfaces/UserGroup.ts';
import type { Fiche } from '@interfaces/Fiche.ts';

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('jwt');

export const useUserGroup = () => {
    const token = getToken();

    return useQuery<HydraCollection<UserGroup>>({
        queryKey: ['user_group'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/user_groups`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error('Failed to fetch group users');

            const json: HydraCollection<UserGroup> = await res.json();
            return json;
        },
        enabled: !!token,
    });
};

export type GroupsUsersPayload = UserGroup & { __method: 'POST' | 'PATCH' };

async function submitUserGroup(
    userGroup: GroupsUsersPayload
): Promise<ApiPlatformResponse<Fiche>> {
    const { __method, ...payload } = userGroup;
    const token = getToken();

    const url =
        __method === 'PATCH'
            ? `${API_URL}/user_groups/${userGroup.id}`
            : `${API_URL}/user_groups`;

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

export const useUserGroupSubmit = ({
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
        mutationFn: submitUserGroup,
        onSuccess: (data) => {
            if (!disableAutoRefetch) {
                queryClient.invalidateQueries({ queryKey: ['user_group'] });
            }
            onSuccess?.(data);
        },
        onError,
    });
};
