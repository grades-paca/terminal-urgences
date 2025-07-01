import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, {
    TextEncoder,
    TextDecoder,
});

jest.mock('@features/auth/useLogin', () => ({
    useLogin: jest.fn(),
}));
jest.mock('@features/auth/useMe', () => ({
    useMe: jest.fn(),
}));

jest.mock('@features/config/useConfigView', () => ({
    useConfigView: jest.fn(),
}));
