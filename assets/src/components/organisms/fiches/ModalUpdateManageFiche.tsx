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
import { useCreateFiche } from '@services/parameters/useFiche.tsx';
import {
    type ApiPlatformError,
    isApiPlatformError,
} from '@interfaces/HydraCollection.ts';

interface ModalUpdateManageFicheProps {
    fichesParent?: Fiche[] | undefined;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const initialState: Fiche = {
    id: '',
    idTerme: '',
    description: null,
    importation: null,
    configuration: null,
};

export const ModalUpdateManageFiche = ({
    fichesParent,
    openModal,
    setOpenModal,
}: ModalUpdateManageFicheProps) => {
    const [fiche, setFiche] = useState<Fiche>(initialState);
    const [ficheError, setFicheError] = useState<FicheError>({});

    useEffect(() => {
        setFiche(initialState);
    }, [openModal]);

    const saveFiche = () => {
        fiche.configuration =
            fiche.configuration === '' ? null : fiche.configuration;
        mutate(fiche);
    };

    const { mutate } = useCreateFiche({
        onSuccess: () => {
            setOpenModal(false);
        },
        onError: (error: ApiPlatformError | Error) => {
            if (isApiPlatformError(error)) {
                const result: FicheError = {};

                if (error.violations) {
                    for (const v of error.violations) {
                        result[v.propertyPath] = v.message;
                    }
                }
                setFicheError(result);
            }
        },
    });

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveFiche();
                }}
            >
                <ModalHeader>Création d'une fiche</ModalHeader>
                <ModalBody>
                    <div className="flex max-w-md flex-col gap-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex flex-col">
                                <LabelTextInput
                                    id={'id'}
                                    label={'ID'}
                                    value={fiche.id}
                                    minLength={5}
                                    maxLength={32}
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col">
                                <LabelTextInput
                                    id={'idTerme'}
                                    label={'IDTerm *'}
                                    value={fiche.idTerme}
                                    minLength={5}
                                    maxLength={32}
                                    required
                                    error={ficheError.idTerme}
                                    onChange={(e) =>
                                        setFiche((prev) => ({
                                            ...prev,
                                            id: AlphanumericValidator.sanitize(
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
                                value={fiche.description ?? undefined}
                                sizing="lg"
                                maxLength={255}
                                error={ficheError.description}
                                onChange={(e) =>
                                    setFiche((prev) => ({
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
                                value={fiche.importation ?? undefined}
                                minLength={5}
                                maxLength={32}
                                error={ficheError.importation}
                                onChange={(e) =>
                                    setFiche((prev) => ({
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
                                value={fiche.configuration ?? undefined}
                                onChange={(e) =>
                                    setFiche((prev) => ({
                                        ...prev,
                                        configuration: e.target.value,
                                    }))
                                }
                            >
                                <option value="">---</option>
                                {fichesParent?.map((fiche: Fiche) => (
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
                    <Button type="submit">Sauvegarder</Button>
                    <Button color="red" onClick={() => setOpenModal(false)}>
                        Annuler
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
