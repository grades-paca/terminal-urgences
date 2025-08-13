import { TUTOS_LINK } from '@const/const.ts';
import { ManageFiches } from '@organisms/fiches/ManageFiches.tsx';
import { useParams } from 'react-router-dom';
import {
    TabsWithRights,
    type TabsWithRightsItem,
} from '@organisms/TabsWithRightsItem.tsx';

export const ParameterFiches = () => {
    // TODO feature access not exist
    const { viewType } = useParams();
    const rights = { standard: true, conf: true, transfer: false };
    const subLink = 'admin-gestion-gestion-des-groupes';

    const items: TabsWithRightsItem[] = [
        {
            id: 'standard',
            label: 'Création et gestion des fiches',
            content: <ManageFiches />,
            allowed: rights.standard,
            link: TUTOS_LINK + subLink,
        },
        {
            id: 'conf',
            label: 'Configuration des fiches',
            content: 'Contenu 2',
            allowed: rights.conf,
            link: TUTOS_LINK + subLink,
        },
        {
            id: 'transfer',
            label: 'Gestion des transferts entres fiches',
            content: 'Contenu 3',
            allowed: rights.transfer,
            link: TUTOS_LINK + subLink,
        },
    ];

    return <TabsWithRights items={items} activeId={viewType} />;
};
