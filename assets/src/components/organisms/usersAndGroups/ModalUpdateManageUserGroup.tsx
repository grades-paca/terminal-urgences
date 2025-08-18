import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'flowbite-react';

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import {
    type ApiPlatformError,
    isApiPlatformError,
} from '@interfaces/HydraCollection.ts';
import { useUnsavedChangesPrompt } from '@hooks/useUnsavedChangesPrompt.tsx';
import type { UserGroup, UserGroupError } from '@interfaces/UserGroup.ts';
import { useUserGroupSubmit } from '@services/parameters/useUserGroup.tsx';
import { LabelTextInput } from '@molecules/form/LabelTextInput.tsx';
import { AlphanumericValidator } from '@tools/Validator.tsx';
import { LabelSelectInput } from '@molecules/form/LabelSelectInput.tsx';
import {
    type ModeH24Type,
    SCHEDULER_TYPES_H24,
    ScheduleSelect,
} from '@molecules/form/ScheduleSelect.tsx';

interface ModalUpdateManageUserGroupProps {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    userGroup?: UserGroup | null;
}

const initialState: UserGroup = {
    id: undefined,
    name: '',
    targetIdentifier: '',
    targetType: 'none',
    h24: true,
    from: undefined,
    to: undefined,
    logs: null,
};

export const ModalUpdateManageUserGroup = ({
    openModal,
    setOpenModal,
    userGroup,
}: ModalUpdateManageUserGroupProps) => {
    const [userGroupState, setUserGroupState] =
        useState<UserGroup>(initialState);
    const [userGroupError, setUserGroupError] = useState<UserGroupError>({});
    const [initialUserGroup] = useState<UserGroup>(initialState);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setUserGroupState(userGroup ?? initialState);
        setUserGroupError({});
    }, [userGroup, openModal]);

    useEffect(() => {
        const changed =
            JSON.stringify(userGroupState) !== JSON.stringify(initialUserGroup);
        setHasChanges(changed);
    }, [userGroupState, initialUserGroup]);

    const saveUserGroup = () => {
        setHasChanges(false);
        submitUserGroup({
            ...userGroupState,
            __method: userGroup ? 'PATCH' : 'POST',
        });
    };

    const { confirmAndClose } = useUnsavedChangesPrompt({
        openModal: openModal,
        isDirty: hasChanges,
        onClose: () => setOpenModal(false),
    });

    const onError = (error: ApiPlatformError | Error) => {
        if (isApiPlatformError(error)) {
            const result: UserGroupError = {};

            if (error.violations) {
                for (const v of error.violations) {
                    result[v.propertyPath] = v.message;
                }
            }
            setUserGroupError(result);
        }
    };

    const { mutate: submitUserGroup } = useUserGroupSubmit({
        onSuccess: () => {
            confirmAndClose();
        },
        onError: onError,
    });

    return (
        <Modal show={openModal} onClose={confirmAndClose} dismissible>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveUserGroup();
                }}
                data-testId="modal-create-update-manage-user-group"
            >
                <ModalHeader>Création d'un groupe d'utilisateur</ModalHeader>
                <ModalBody>
                    <div className="flex max-w-md flex-col gap-4">
                        <LabelTextInput
                            id={'name'}
                            label={'Nom'}
                            value={userGroupState.name ?? undefined}
                            minLength={5}
                            maxLength={32}
                            required
                            error={userGroupError.name}
                            onChange={(e) =>
                                setUserGroupState((prev) => ({
                                    ...prev,
                                    name: AlphanumericValidator.sanitize(
                                        e.target.value
                                    ),
                                }))
                            }
                        />

                        <LabelTextInput
                            id={'targetIdentifier'}
                            label={'Identifiant cible'}
                            value={userGroupState.targetIdentifier ?? undefined}
                            minLength={5}
                            maxLength={32}
                            error={userGroupError.targetIdentifier}
                            onChange={(e) =>
                                setUserGroupState((prev) => ({
                                    ...prev,
                                    targetIdentifier:
                                        AlphanumericValidator.sanitize(
                                            e.target.value
                                        ),
                                }))
                            }
                        />

                        <LabelSelectInput
                            id="targetType"
                            label="Type de cible"
                            value={userGroupState.targetType ?? undefined}
                            error={userGroupError.targetType}
                            onChange={(e) =>
                                setUserGroupState((prev) => ({
                                    ...prev,
                                    targetType: e.target.value,
                                }))
                            }
                        >
                            <option value="none">Pas de cible associé</option>
                            <option value="establishment">Etablissement</option>
                            <option value="service">Service</option>
                        </LabelSelectInput>

                        <ScheduleSelect
                            value={{
                                modeH24: userGroupState.h24
                                    ? SCHEDULER_TYPES_H24
                                    : 'plage',
                                to: userGroupState.to,
                                from: userGroupState.from,
                            }}
                            onChange={(v: {
                                modeH24: ModeH24Type;
                                to?: string;
                                from?: string;
                            }) => {
                                setUserGroupState((prev) => ({
                                    ...prev,
                                    h24: v.modeH24 === SCHEDULER_TYPES_H24,
                                    to: v.to,
                                    from: v.from,
                                }));
                            }}
                            error={userGroupError}
                        />
                        <p className="mt-1 text-xs">
                            Sélection actuelle :{' '}
                            <span className="font-medium">
                                {userGroupState.h24 ? 'H24' : 'Plage horaire'}
                            </span>
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit"
                        data-testid={
                            'modal-create-update-manage-user-group-submit'
                        }
                    >
                        Sauvegarder
                    </Button>
                    <Button color="red" onClick={confirmAndClose}>
                        Annuler
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
