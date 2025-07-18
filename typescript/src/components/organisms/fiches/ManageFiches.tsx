import {
    Button,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Select,
    TextInput,
} from 'flowbite-react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { Fiche } from '@interfaces/Fiche.ts';
import {AlphanumericValidator, LargeTextValidator} from "@tools/Validator.tsx";

export const ManageFiches = () => {
    const [openModal, setOpenModal] = useState(false);
    const [fiche, setFiche] = useState<Fiche>({
        id: '',
        idTerme: '',
        description: '',
        importation: '',
        configuration: '',
    });

    const fichesParent: Fiche[] = []

    return (
        <div>
            <div className="flex justify-between">
                <div className="manage-fiches-filter"></div>
                <div className="manage-fiches-button-add m-1">
                    <Button pill onClick={() => setOpenModal(true)}>
                        <Plus size={24} />
                    </Button>
                </div>
            </div>
            <div className="manage-fiches"></div>
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                dismissible
            >
                <ModalHeader>
                    <h3>Création d'une fiche</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="flex max-w-md flex-col gap-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex flex-col">
                                <Label htmlFor="id" className="text-left">
                                    ID
                                </Label>
                                <TextInput
                                    id="id"
                                    type="text"
                                    sizing="md"
                                    disabled
                                    required
                                    value={fiche.id}
                                />
                            </div>

                            <div className="flex flex-col">
                                <Label htmlFor="idTerme" className="text-left">
                                    IDTerm
                                </Label>
                                <TextInput
                                    id="idTerme"
                                    type="text"
                                    sizing="md"
                                    required
                                    value={fiche.idTerme}
                                    onChange={(e) =>
                                        setFiche((prev) => ({
                                            ...prev,
                                            id: AlphanumericValidator.sanitize(e.target.value),
                                            idTerme: AlphanumericValidator.sanitize(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="large">Description</Label>
                            </div>
                            <TextInput
                                id="description"
                                type="text"
                                sizing="lg"
                                value={fiche.description}
                                onChange={(e) =>
                                    setFiche((prev) => ({
                                        ...prev,
                                        description: LargeTextValidator.sanitize(e.target.value),
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="large">Importation</Label>
                            </div>
                            <TextInput
                                id="importation"
                                type="text"
                                sizing="md"
                                value={fiche.importation}
                                onChange={(e) =>
                                    setFiche((prev) => ({
                                        ...prev,
                                        importation: AlphanumericValidator.sanitize(e.target.value),
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="large">Configuration</Label>
                            </div>
                            <Select
                                id="configuration"
                                required
                                value={fiche.configuration}
                                onChange={(e) =>
                                    setFiche((prev) => ({
                                        ...prev,
                                        configuration: e.target.value,
                                    }))
                                }
                            >
                                <option>---</option>
                                {
                                    fichesParent.map((fiche: Fiche) => (
                                        <option key={fiche.id} value={fiche.id}>
                                            {fiche.idTerme}
                                        </option>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => setOpenModal(false)}
                    >
                        Sauvegarder
                    </Button>
                    <Button
                        color="red"
                        onClick={() => setOpenModal(false)}
                    >
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
