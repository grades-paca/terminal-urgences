import {useLogin} from "@services/auth/useLogin.tsx";
import {vi} from "vitest";
import {useMe} from "@services/auth/useMe.tsx";

export const mockMutate = vi.fn();
export const mockedUseLogin = useLogin as ReturnType<typeof vi.fn>;
export const mockedUseMe = useMe as ReturnType<typeof vi.fn>;

export const notLogin = () => {
    mockedUseMe.mockReturnValue({ data: null, isLoading: false });
    mockedUseLogin.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        isError: false,
    });
}

export const login = () => {
    mockedUseMe.mockReturnValue({
        data: { username: 'testuser' },
        isLoading: false,
    });
    mockedUseLogin.mockReturnValue({
        mutate: vi.fn(),
        isPending: false,
        isError: false,
    });
}
