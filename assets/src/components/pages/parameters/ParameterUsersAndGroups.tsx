import {
    TabsWithRights,
    type TabsWithRightsItem,
} from '@organisms/TabsWithRightsItem.tsx';
import { TUTOS_LINK } from '@const/const.ts';
import { useParams } from 'react-router-dom';
import { ManageUserGroup } from '@organisms/usersAndGroups/ManageUserGroup.tsx';

export const ParameterUsersAndGroups = () => {
    // TODO feature access not exist
    const { viewType } = useParams();
    const rights = { users: true, groups: true };
    const subLink = 'admin-gestion-gestion-fiches-et-vues';

    const items: TabsWithRightsItem[] = [
        {
            id: 'users',
            label: 'Création et gestion des fiches',
            content: 'CONTENT MANAGE USERS',
            allowed: rights.users,
            link: TUTOS_LINK + subLink,
        },
        {
            id: 'groups',
            label: 'Configuration des fiches',
            content: <ManageUserGroup />,
            allowed: rights.groups,
            link: TUTOS_LINK + subLink,
        },
    ];

    return <TabsWithRights items={items} activeId={viewType} />;
};
