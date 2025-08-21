import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import { login, mockMutate } from './utils/authMocks.ts';
import {
    ALPHANUM_SANITIZED,
    testSanitizedInput,
} from './utils/testSanitizer.tsx';
import userEvent from '@testing-library/user-event';
import {
    useUserGroup,
    useUserGroupSubmit,
} from '@services/parameters/useUserGroup.tsx';
import { simpleRender } from './utils/render.tsx';
import { ROUTE_PARAMETER_GROUPS_STANDARD } from '@const/navigation.ts';

// Mocks globaux
vi.mock('@services/parameters/useUserGroup', () => ({
    useUserGroup: vi.fn(),
    useUserGroupSubmit: vi.fn(),
}));

export const mockedUseUserGroups = useUserGroup as ReturnType<typeof vi.fn>;
export const mockedUseUserGroupSubmit = useUserGroupSubmit as ReturnType<
    typeof vi.fn
>;

mockedUseUserGroups.mockReturnValue({
    member: [],
});

mockedUseUserGroupSubmit.mockReturnValue({
    mutate: mockMutate,
});

describe('Test of group interface', () => {
    beforeEach(() => {
        login();
        simpleRender(ROUTE_PARAMETER_GROUPS_STANDARD);
    });

    it('Should be able to handle create groups', async () => {
        const manageGroupAddBtn = screen.getByTestId(
            'manage-user-groups-add-btn'
        );
        expect(manageGroupAddBtn).toBeInTheDocument();
        manageGroupAddBtn.click();

        const modal = await screen.findByTestId(
            'modal-create-update-manage-user-group'
        );

        const inputName = within(modal).getByTestId('name') as HTMLInputElement;
        expect(inputName).toBeRequired();

        const inputScheduleSelect = within(modal).getByTestId(
            'scheduleSelect'
        ) as HTMLInputElement;
        expect(inputScheduleSelect).toBeRequired();

        const inputTargetIdentifier = within(modal).getByTestId(
            'targetIdentifier'
        ) as HTMLInputElement;
        expect(inputTargetIdentifier).not.toBeRequired();

        const inputTargetType = within(modal).getByTestId(
            'targetType'
        ) as HTMLInputElement;
        expect(inputTargetType).not.toBeRequired();

        await testSanitizedInput({
            field: inputName,
            expectedSanitized: ALPHANUM_SANITIZED,
            expectedMaxLength: 32,
        });

        await testSanitizedInput({
            field: inputTargetIdentifier,
            expectedSanitized: ALPHANUM_SANITIZED,
            expectedMaxLength: 32,
        });

        let isValid = (modal as HTMLFormElement).checkValidity();
        expect(isValid).toBe(true);

        await userEvent.clear(inputName);
        isValid = (modal as HTMLFormElement).checkValidity();
        expect(isValid).toBe(false);

        await userEvent.type(inputName, 'aaaa');
        isValid = (modal as HTMLFormElement).checkValidity();
        expect(isValid).toBe(true);
    }, 10000);

    it('Check ScheduleSelect inner form', async () => {
        const manageGroupAddBtn = screen.getByTestId(
            'manage-user-groups-add-btn'
        );
        manageGroupAddBtn.click();

        const modal = await screen.findByTestId(
            'modal-create-update-manage-user-group'
        );

        const inputScheduleSelect = within(modal).getByTestId(
            'scheduleSelect'
        ) as HTMLSelectElement;

        expect(inputScheduleSelect).toHaveValue('H24');
        expect(
            within(modal).queryByLabelText(/Début/i)
        ).not.toBeInTheDocument();
        expect(within(modal).queryByLabelText(/Fin/i)).not.toBeInTheDocument();

        await userEvent.selectOptions(inputScheduleSelect, 'plage');
        expect(inputScheduleSelect).toHaveValue('plage');

        // Requery après MAJ du DOM
        const fromInput = await within(modal).findByLabelText(/Début/i);
        const toInput = await within(modal).findByLabelText(/Fin/i);

        await userEvent.clear(fromInput);
        await userEvent.type(fromInput, '08:00');
        expect(fromInput).toHaveValue('08:00');

        await userEvent.clear(toInput);
        await userEvent.type(toInput, '12:30');
        expect(toInput).toHaveValue('12:30');
    });

    it('Should be able to handle create not duplicate group name', async () => {
        const manageGroupAddBtn = screen.getByTestId(
            'manage-user-groups-add-btn'
        );
        expect(manageGroupAddBtn).toBeInTheDocument();
        manageGroupAddBtn.click();

        mockedUseUserGroupSubmit.mockImplementation(({ onError }) => ({
            mutate: () => {
                onError?.({
                    '@context': '/api/contexts/ConstraintViolation',
                    '@id': '/api/validation_errors/23bd9dbf-6b9b-41cd-a99e-4844bcf3077f',
                    '@type': 'ConstraintViolation',
                    status: 422,
                    violations: [
                        {
                            propertyPath: 'name',
                            message: 'Cette valeur est déjà utilisée.',
                            code: '23bd9dbf-6b9b-41cd-a99e-4844bcf3077f',
                        },
                    ],
                    detail: 'name: Cette valeur est déjà utilisée.',
                    description: 'name: Cette valeur est déjà utilisée.',
                    type: '/validation_errors/23bd9dbf-6b9b-41cd-a99e-4844bcf3077f',
                    title: 'An error occurred',
                });
            },
        }));

        const modal = await screen.findByTestId(
            'modal-create-update-manage-user-group'
        );
        const inputName = within(modal).getByTestId('name') as HTMLInputElement;

        await userEvent.clear(inputName);
        await userEvent.type(inputName, 'aaaa');

        const submitBtn = await within(modal).findByTestId(
            'modal-create-update-manage-user-group-submit'
        );

        await act(async () => {
            await userEvent.click(submitBtn);
        });

        const error = await within(modal).findByTestId('name-error');
        expect(error).toHaveTextContent('Cette valeur est déjà utilisée.');
    });
});

describe('Group permissions', () => {
    it('Should display group permissions when clicking on a group row', async () => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();

        mockedUseUserGroups.mockReturnValue({
            isLoading: false,
            data: {
                '@context': '/api/contexts/UserGroup',
                '@id': '/api/user_groups',
                '@type': 'Collection',
                totalItems: 1,
                member: [
                    {
                        '@id': '/api/user_groups/1',
                        '@type': 'UserGroup',
                        id: 1,
                        name: 'Administrateur',
                        targetType: 'service',
                        h24: true,
                        logs: [
                            {
                                id: 1,
                                timestamp: '2025-08-20T07:01:54+00:00',
                                action: 'create',
                                entityClass: 'App\\Entity\\UserGroup',
                                changes: null,
                                entityId: '1',
                                user: null,
                            },
                        ],
                    },
                ],
            },
        });

        login();
        simpleRender(ROUTE_PARAMETER_GROUPS_STANDARD);

        const manageUserGroup = await screen.findByTestId('ManageUserGroup');

        const row = await within(manageUserGroup).findByRole('row', {
            name: /Administrateur/i,
        });

        expect(row).toBeInTheDocument();

        await userEvent.click(row);

        const permissions = await screen.findByTestId('groupPermission');
        expect(permissions).toBeInTheDocument(); // Vérifie que GroupPermission est affiché
    });
});
