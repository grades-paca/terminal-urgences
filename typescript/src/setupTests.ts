import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
import { vi } from 'vitest';

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
