import { useMemo, useState } from 'react';
import { useFiches, useFicheSubmit } from '@services/parameters/useFiche.tsx';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'flowbite-react';
import { Plus } from 'lucide-react';
import { ModalUpdateManageFiche } from '@organisms/fiches/ModalUpdateManageFiche.tsx';
import { SortableTable } from '@organisms/tables/SortableTable.tsx';
import {
    type FicheWithChildren,
    getColumns,
} from '@config/tables/ManageFichesColumn.tsx';

export const ManageFiches = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingChange, setPendingChange] = useState<{
        id: string;
        isChecked: boolean;
    } | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [updateFiche, setUpdateFiche] = useState<FicheWithChildren | null>(
        null
    );

    const { data: fiches, isLoading: isLoadingFiche } = useFiches();
    const { mutate: submitFiche } = useFicheSubmit({});

    const fichesParent = useMemo(() => {
        return (
            fiches?.member.filter(
                (fiche) => fiche.configuration === undefined
            ) ?? []
        );
    }, [fiches?.member]);

    const fichesEnfants = useMemo(() => {
        return (
            fiches?.member.filter(
                (fiche) => fiche.configuration !== undefined
            ) ?? []
        );
    }, [fiches?.member]);

    const fichesDisplay = useMemo(() => {
        return fichesParent.map((parent) => {
            const isDisabled = parent.archived === true;

            const children = fichesEnfants
                .filter(
                    (enfant) =>
                        enfant.configuration === `/api/fiches/${parent.id}`
                )
                .map((enfant) => ({
                    ...enfant,
                    disabled: isDisabled,
                }));

            return {
                ...parent,
                disabled: false,
                children: children,
            };
        });
    }, [fichesParent, fichesEnfants]);

    const handleEditFiche = (fiche: FicheWithChildren) => {
        setUpdateFiche(fiche);
        setOpenModal(true);
    };

    const confirmArchiveChange = (id: string, isChecked: boolean) => {
        const fiche = fiches?.member.find((f) => f.id === id);
        if (!fiche) return;

        submitFiche({
            ...fiche,
            __method: 'PATCH',
            archived: isChecked,
        });

        setPendingChange(null);
        setShowConfirmModal(false);
    };

    const onChangeArchiveStatus = (id: string, isChecked: boolean) => {
        if (isLoadingFiche) return;

        if (isChecked) {
            setPendingChange({ id, isChecked });
            setShowConfirmModal(true);
        } else {
            confirmArchiveChange(id, isChecked);
        }
    };

    return (
        <div className={'bg-[var(--color-primary-50)] rounded-lg'}>
            <div className="flex justify-between">
                <div className="manage-fiches-filter"></div>
                <div className="manage-fiches-button-add m-1">
                    <Button
                        pill
                        onClick={() => {
                            setUpdateFiche(null);
                            setOpenModal(true);
                        }}
                        data-testid="manage-fiches-add-btn"
                    >
                        <Plus size={24} />
                    </Button>
                </div>
            </div>
            <div className={'manageFiches'}>
                {!isLoadingFiche ? (
                    <SortableTable
                        data={fichesDisplay}
                        columns={getColumns(
                            handleEditFiche,
                            onChangeArchiveStatus
                        )}
                        getSubRows={(row: FicheWithChildren) => row.children}
                        columnVisibility={{
                            id: false,
                            disabled: false,
                        }}
                    />
                ) : (
                    'IsLoading'
                )}
            </div>
            <ModalUpdateManageFiche
                fichesParent={fichesParent}
                openModal={openModal}
                setOpenModal={setOpenModal}
                fiche={updateFiche}
            />
            <Modal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
            >
                <ModalHeader>Confirmer l'action</ModalHeader>
                <ModalBody>
                    <p>Voulez-vous vraiment archiver cette fiche ?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            if (pendingChange !== null) {
                                confirmArchiveChange(
                                    pendingChange.id,
                                    pendingChange.isChecked
                                );
                            }
                        }}
                    >
                        Confirmer
                    </Button>
                    <Button
                        onClick={() => setShowConfirmModal(false)}
                        color="red"
                    >
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
