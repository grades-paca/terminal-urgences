import { Button } from 'flowbite-react';
import { Plus } from 'lucide-react';
import { SortableTable } from '@organisms/tables/SortableTable.tsx';
import { useEffect, useRef, useState } from 'react';
import type { UserGroup } from '@interfaces/UserGroup.ts';
import { getColumns } from '@config/tables/ManageUserGroupColumn.tsx';
import { useUserGroup } from '@services/parameters/useUserGroup.tsx';
import { ModalUpdateManageUserGroup } from '@organisms/usersAndGroups/ModalUpdateManageUserGroup.tsx';
import { GroupPermission } from '@organisms/usersAndGroups/GroupPermission.tsx';

export const ManageUserGroup = () => {
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [userGroupState, setUserGroupState] = useState<UserGroup | null>(
        null
    );
    const [selectedItem, setSelectedItem] = useState<UserGroup | null>(null);

    const { data: groupUsers, isLoading: isLoadingUserGroup } = useUserGroup();

    useEffect(() => {
        if (selectedItem && anchorRef.current) {
            anchorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedItem]);

    const handleSelChange = ({ originals }: { originals: UserGroup[] }) => {
        setSelectedItem(originals[0] ?? null);
    };

    const onEditUserGroup = (userGroup: UserGroup) => {
        setUserGroupState(userGroup);
        setOpenModal(true);
    };

    return (
        <div data-testid={'ManageUserGroup'}>
            <div className={'bg-[var(--color-primary-50)] rounded-lg'}>
                <div className="flex justify-between">
                    <div className="manage-user-groups-filter"></div>
                    <div className="manage-user-groups-button-add m-1">
                        <Button
                            pill
                            onClick={() => {
                                setUserGroupState(null);
                                setOpenModal(true);
                            }}
                            data-testid="manage-user-groups-add-btn"
                        >
                            <Plus size={24} />
                        </Button>
                    </div>
                </div>
                <div className={'manageGroups'}>
                    {!isLoadingUserGroup && groupUsers?.member ? (
                        <SortableTable
                            data={groupUsers.member}
                            columns={getColumns(onEditUserGroup)}
                            columnVisibility={{
                                id: false,
                                disabled: false,
                            }}
                            selectionMode={'single'}
                            onSelectionChange={handleSelChange}
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
            <div ref={anchorRef} className={'m-2'}>
                {selectedItem && (
                    <GroupPermission selectedItem={selectedItem} />
                )}
            </div>
        </div>
    );
};
