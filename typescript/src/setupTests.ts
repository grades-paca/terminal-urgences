import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, {
    TextEncoder,
    TextDecoder,
});

jest.mock('@services/auth/useLogin', () => ({
    useLogin: jest.fn(),
}));
jest.mock('@services/auth/useMe', () => ({
    useMe: jest.fn(),
}));

jest.mock('@services/config/useConfigView', () => ({
    useConfigView: jest.fn(),
}));
