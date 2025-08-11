import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'flowbite-react';
import { LabelTextInput } from '@molecules/form/LabelTextInput.tsx';
import {
    AlphanumericValidator,
    LargeTextValidator,
} from '@tools/Validator.tsx';
import { LabelSelectInput } from '@molecules/form/LabelSelectInput.tsx';
import type { Fiche, FicheError } from '@interfaces/Fiche.ts';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useFicheSubmit } from '@services/parameters/useFiche.tsx';
import {
    type ApiPlatformError,
    isApiPlatformError,
} from '@interfaces/HydraCollection.ts';

interface ModalUpdateManageFicheProps {
    fichesParent?: Fiche[] | undefined;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    fiche?: Fiche | null;
}

const initialState: Fiche = {
    id: '',
    idTerme: '',
    description: null,
    importation: null,
    configuration: null,
    logs: [],
    archived: false,
};

export const ModalUpdateManageFiche = ({
    fichesParent,
    openModal,
    setOpenModal,
    fiche,
}: ModalUpdateManageFicheProps) => {
    const [ficheState, setFicheState] = useState<Fiche>(initialState);
    const [ficheError, setFicheError] = useState<FicheError>({});

    useEffect(() => {
        setFicheState(fiche ?? initialState);
        setFicheError({});
    }, [fiche, openModal]);

    const saveFiche = () => {
        submitFiche({
            ...ficheState,
            configuration:
                ficheState.configuration === ''
                    ? null
                    : ficheState.configuration,
            __method: fiche ? 'PATCH' : 'POST',
        });
    };

    const onError = (error: ApiPlatformError | Error) => {
        if (isApiPlatformError(error)) {
            const result: FicheError = {};

            if (error.violations) {
                for (const v of error.violations) {
                    result[v.propertyPath] = v.message;
                }
            }
            setFicheError(result);
        }
    };

    const { mutate: submitFiche } = useFicheSubmit({
        onSuccess: () => {
            setOpenModal(false);
        },
        onError: onError,
    });

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveFiche();
                }}
                data-testId="modal-create-update-manage-fiche"
            >
                <ModalHeader>Création d'une fiche</ModalHeader>
                <ModalBody>
                    <div className="flex max-w-md flex-col gap-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex flex-col">
                                <LabelTextInput
                                    id={'id'}
                                    label={'ID'}
                                    value={ficheState.id}
                                    minLength={4}
                                    maxLength={32}
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col">
                                <LabelTextInput
                                    id={'idTerme'}
                                    label={'IDTerm *'}
                                    value={ficheState.idTerme}
                                    minLength={4}
                                    maxLength={32}
                                    required
                                    error={ficheError.idTerme}
                                    onChange={(e) =>
                                        setFicheState((prev) => ({
                                            ...prev,
                                            id: fiche
                                                ? prev.id
                                                : AlphanumericValidator.sanitize(
                                                      e.target.value
                                                  ),
                                            idTerme:
                                                AlphanumericValidator.sanitize(
                                                    e.target.value
                                                ),
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <LabelTextInput
                                id={'description'}
                                label={'Description'}
                                value={ficheState.description ?? undefined}
                                sizing="lg"
                                maxLength={255}
                                error={ficheError.description}
                                onChange={(e) =>
                                    setFicheState((prev) => ({
                                        ...prev,
                                        description:
                                            LargeTextValidator.sanitize(
                                                e.target.value
                                            ),
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <LabelTextInput
                                id={'importation'}
                                label={'Importation'}
                                value={ficheState.importation ?? undefined}
                                minLength={4}
                                maxLength={32}
                                error={ficheError.importation}
                                onChange={(e) =>
                                    setFicheState((prev) => ({
                                        ...prev,
                                        importation:
                                            AlphanumericValidator.sanitize(
                                                e.target.value
                                            ),
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <LabelSelectInput
                                id="configuration"
                                label="Configuration"
                                value={ficheState.configuration ?? undefined}
                                onChange={(e) =>
                                    setFicheState((prev) => ({
                                        ...prev,
                                        configuration: e.target.value,
                                    }))
                                }
                            >
                                <option value="">---</option>
                                {fichesParent
                                    ?.filter((fiche: Fiche) => !fiche.archived)
                                    .map((fiche: Fiche) => (
                                        <option
                                            key={fiche.id}
                                            value={`/api/fiches/${fiche.id}`}
                                        >
                                            {fiche.idTerme}
                                        </option>
                                    ))}
                            </LabelSelectInput>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit"
                        data-testid={'modal-create-update-manage-fiche-submit'}
                    >
                        Sauvegarder
                    </Button>
                    <Button color="red" onClick={() => setOpenModal(false)}>
                        Annuler
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
