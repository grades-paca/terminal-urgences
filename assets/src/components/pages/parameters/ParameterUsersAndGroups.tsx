import {
    TabsWithRights,
    type TabsWithRightsItem,
} from '@organisms/TabsWithRightsItem.tsx';
import { TUTOS_LINK } from '@const/const.ts';
import { useParams } from 'react-router-dom';
import { ManageGroups } from '@organisms/usersAndGroups/ManageGroups.tsx';

export const ParameterUsersAndGroups = () => {
    // TODO feature access not exist
    const { viewType } = useParams();
    const rights = { users: true, groups: true };
    const subLink = 'admin-gestion-gestion-fiches-et-vues';

    const items: TabsWithRightsItem[] = [
        {
            id: 'standard',
            label: 'Création et gestion des fiches',
            content: 'CONTENT MANAGE USERS', //<ManageUsers />,
            allowed: rights.users,
            link: TUTOS_LINK + subLink,
        },
        {
            id: 'conf',
            label: 'Configuration des fiches',
            content: <ManageGroups />,
            allowed: rights.groups,
            link: TUTOS_LINK + subLink,
        },
    ];

    return <TabsWithRights items={items} activeId={viewType} />;
};
