import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import { login, mockMutate } from './utils/authMocks.ts';
import { ParameterFiches } from '@pages/parameters/ParameterFiches.tsx';
import { useFiches, useFicheSubmit } from '@services/parameters/useFiche.tsx';
import {
    ALPHANUM_SANITIZED,
    LARGE_TEXT_SANITIZED,
    testSanitizedInput,
} from './utils/testSanitizer.tsx';
import userEvent from '@testing-library/user-event';

// Mocks globaux
vi.mock('@services/parameters/useFiche', () => ({
    useFiches: vi.fn(),
    useFicheSubmit: vi.fn(),
}));

export const mockedUseFiches = useFiches as ReturnType<typeof vi.fn>;
export const mockedUseFicheSubmit = useFicheSubmit as ReturnType<typeof vi.fn>;

mockedUseFiches.mockReturnValue({
    member: [],
});

mockedUseFicheSubmit.mockReturnValue({
    mutate: mockMutate,
});

describe('Test of fiches interface', () => {
    beforeEach(() => {
        login();
        render(<ParameterFiches />);
    });

    it('Should be able to handle create fiches', async () => {
        const manageFicheAddBtn = screen.getByTestId('manage-fiches-add-btn');
        expect(manageFicheAddBtn).toBeInTheDocument();
        manageFicheAddBtn.click();

        const modal = await screen.findByTestId(
            'modal-create-update-manage-fiche'
        );

        const inputId = within(modal).getByTestId('id') as HTMLInputElement;
        expect(inputId).toBeDisabled();

        const inputIdTerme = within(modal).getByTestId(
            'idTerme'
        ) as HTMLInputElement;
        expect(inputIdTerme).toBeRequired();

        const inputDescription = within(modal).getByTestId(
            'description'
        ) as HTMLInputElement;
        expect(inputDescription).not.toBeRequired();

        const inputImportation = within(modal).getByTestId(
            'importation'
        ) as HTMLInputElement;
        expect(inputImportation).not.toBeRequired();

        await testSanitizedInput({
            field: inputIdTerme,
            expectedSanitized: ALPHANUM_SANITIZED,
            expectedMaxLength: 32,
        });
        expect(inputId).toHaveValue(ALPHANUM_SANITIZED);

        await testSanitizedInput({
            field: inputDescription,
            expectedSanitized: LARGE_TEXT_SANITIZED,
            expectedMaxLength: 255,
        });

        await testSanitizedInput({
            field: inputImportation,
            expectedSanitized: ALPHANUM_SANITIZED,
            expectedMaxLength: 32,
        });

        let isValid = (modal as HTMLFormElement).checkValidity();
        expect(isValid).toBe(true);

        await userEvent.clear(inputIdTerme);
        isValid = (modal as HTMLFormElement).checkValidity();
        expect(isValid).toBe(false);

        await userEvent.type(inputIdTerme, 'aaaa');
        isValid = (modal as HTMLFormElement).checkValidity();
        expect(isValid).toBe(true);
    });

    it('Should be able to handle create not duplicate fiches idTerms', async () => {
        const manageFicheAddBtn = screen.getByTestId('manage-fiches-add-btn');
        expect(manageFicheAddBtn).toBeInTheDocument();
        manageFicheAddBtn.click();

        mockedUseFicheSubmit.mockImplementation(({ onError }) => ({
            mutate: () => {
                onError?.({
                    '@context': '/api/contexts/ConstraintViolation',
                    '@id': '/api/validation_errors/23bd9dbf-6b9b-41cd-a99e-4844bcf3077f',
                    '@type': 'ConstraintViolation',
                    status: 422,
                    violations: [
                        {
                            propertyPath: 'idTerme',
                            message: 'Cette valeur est déjà utilisée.',
                            code: '23bd9dbf-6b9b-41cd-a99e-4844bcf3077f',
                        },
                    ],
                    detail: 'idTerme: Cette valeur est déjà utilisée.',
                    description: 'idTerme: Cette valeur est déjà utilisée.',
                    type: '/validation_errors/23bd9dbf-6b9b-41cd-a99e-4844bcf3077f',
                    title: 'An error occurred',
                });
            },
        }));

        const modal = await screen.findByTestId(
            'modal-create-update-manage-fiche'
        );
        const inputIdTerme = within(modal).getByTestId(
            'idTerme'
        ) as HTMLInputElement;

        await userEvent.clear(inputIdTerme);
        await userEvent.type(inputIdTerme, 'aaaa');

        const submitBtn = await within(modal).findByTestId(
            'modal-create-update-manage-fiche-submit'
        );

        await act(async () => {
            await userEvent.click(submitBtn);
        });

        const error = await within(modal).findByTestId('idTerme-error');
        expect(error).toHaveTextContent('Cette valeur est déjà utilisée.');
    });
});
