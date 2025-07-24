import type { Fiche } from '@interfaces/Fiche.ts';
import { useMemo, useState } from 'react';
import { useFiches } from '@services/parameters/useFiche.tsx';
import { Button } from 'flowbite-react';
import { Plus } from 'lucide-react';
import { ModalUpdateManageFiche } from '@organisms/fiches/ModalUpdateManageFiche.tsx';

export const ManageFiches = () => {
    const [openModal, setOpenModal] = useState(false);

    const { data: fiches, isLoading: isLoadingFiche } = useFiches();

    const fichesParent: Fiche[] | undefined = useMemo(() => {
        return fiches?.member.filter((fiche: Fiche) => {
            return fiche?.configuration === undefined;
        });
    }, [fiches?.member]);

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
            <div className="manage-fiches">
                {!isLoadingFiche && fiches?.member
                    ? fiches.member.map((fiche: Fiche) => {
                          return <div key={fiche.id}>{fiche.idTerme}</div>;
                      })
                    : 'IsLoading'}
            </div>
            <ModalUpdateManageFiche
                fichesParent={fichesParent}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    );
};
