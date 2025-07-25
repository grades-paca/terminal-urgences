import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
import { vi, beforeEach } from 'vitest';
import { useConfigView } from '@services/config/useConfigView.tsx';

Object.assign(globalThis, {
    TextEncoder,
    TextDecoder,
});

// Mocks globaux
vi.mock('@services/auth/useLogin', () => ({
    useLogin: vi.fn(),
}));

vi.mock('@services/auth/useMe', () => ({
    useMe: vi.fn(),
}));

vi.mock('@services/config/useConfigView', () => ({
    useConfigView: vi.fn(),
}));

export const mockedConfigView = useConfigView as ReturnType<typeof vi.fn>;

beforeEach(() => {
    mockedConfigView.mockReturnValue({ data: [] });
});
