import { useMemo, useState } from 'react';
import { useFiches } from '@services/parameters/useFiche.tsx';
import { Button } from 'flowbite-react';
import { Plus } from 'lucide-react';
import { ModalUpdateManageFiche } from '@organisms/fiches/ModalUpdateManageFiche.tsx';
import { SortableTable } from '@organisms/tables/SortableTable.tsx';
import {
    columns,
    type FicheWithChildren,
} from '@config/tables/ManageFichesColumn.tsx';

export const ManageFiches = () => {
    const [openModal, setOpenModal] = useState(false);

    const { data: fiches, isLoading: isLoadingFiche } = useFiches();

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
        return fichesParent.map((parent) => ({
            ...parent,
            childrens: fichesEnfants.filter(
                (enfant) => enfant.configuration === `/api/fiches/${parent.id}`
            ),
        }));
    }, [fichesParent, fichesEnfants]);

    return (
        <div className={'bg-[var(--color-primary-50)] rounded-lg'}>
            <div className="flex justify-between">
                <div className="manage-fiches-filter"></div>
                <div className="manage-fiches-button-add m-1">
                    <Button
                        pill
                        onClick={() => setOpenModal(true)}
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
                        columns={columns}
                        getSubRows={(row: FicheWithChildren) => row.childrens}
                    />
                ) : (
                    'IsLoading'
                )}
            </div>
            <ModalUpdateManageFiche
                fichesParent={fichesParent}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    );
};
