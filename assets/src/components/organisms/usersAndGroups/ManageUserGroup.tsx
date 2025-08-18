import { Button } from 'flowbite-react';
import { Plus } from 'lucide-react';
import { SortableTable } from '@organisms/tables/SortableTable.tsx';
import { useState } from 'react';
import type { UserGroup } from '@interfaces/UserGroup.ts';
import { getColumns } from '@config/tables/ManageGroupUsersColumn.tsx';
import { useUserGroup } from '@services/parameters/useUserGroup.tsx';
import { ModalUpdateManageUserGroup } from '@organisms/usersAndGroups/ModalUpdateManageUserGroup.tsx';

export const ManageUserGroup = () => {
    const [openModal, setOpenModal] = useState(false);
    const [userGroupState, setUserGroupState] = useState<UserGroup | null>(
        null
    );

    const { data: groupUsers, isLoading: isLoadingUserGroup } = useUserGroup();

    return (
        <div className={'bg-[var(--color-primary-50)] rounded-lg'}>
            <div className="flex justify-between">
                <div className="manage-fiches-filter"></div>
                <div className="manage-fiches-button-add m-1">
                    <Button
                        pill
                        onClick={() => {
                            setUserGroupState(null);
                            setOpenModal(true);
                        }}
                        data-testid="manage-fiches-add-btn"
                    >
                        <Plus size={24} />
                    </Button>
                </div>
            </div>
            <div className={'manageFiches'}>
                {!isLoadingUserGroup && groupUsers?.member ? (
                    <SortableTable
                        data={groupUsers.member}
                        columns={getColumns()}
                        columnVisibility={{
                            id: false,
                            disabled: false,
                        }}
                    />
                ) : (
                    'IsLoading'
                )}
            </div>
            <ModalUpdateManageUserGroup
                openModal={openModal}
                setOpenModal={setOpenModal}
                userGroup={userGroupState}
            />
        </div>
    );
};
