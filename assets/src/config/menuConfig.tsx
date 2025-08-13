import {
    ROUTE_PARAMETER_FICHES_STANDARD,
    ROUTE_PARAMETER_FICHES_CONF,
    ROUTE_PARAMETER_FICHES_TRANSFER,
    ROUTE_PARAMETER_USERS_STANDARD,
    ROUTE_PARAMETER_GROUPS_STANDARD,
} from '@const/navigation.ts';

export type SectionMenuItem = {
    label: string;
    navigate?: string;
    locked?: boolean;
};

export type MenuItem = {
    title: string;
    navigate?: string;
    sections: SectionMenuItem[];
};

export const menuConfig: MenuItem[] = [
    {
        title: 'FICHES',
        navigate: undefined,
        sections: [
            {
                label: 'Création et Gestion des fiches',
                navigate: ROUTE_PARAMETER_FICHES_STANDARD,
            },
            {
                label: 'Configuration des Fiches',
                navigate: ROUTE_PARAMETER_FICHES_CONF,
            },
            {
                label: 'Gestion des Transferts entre fiches',
                navigate: ROUTE_PARAMETER_FICHES_TRANSFER,
                locked: true,
            },
        ],
    },
    {
        title: 'ONGLETS',
        navigate: undefined,
        sections: [],
    },
    {
        title: 'UTILISATEURS ET DROITS',
        navigate: undefined,
        sections: [
            {
                label: 'Création et Gestion des utilisateurs',
                navigate: ROUTE_PARAMETER_USERS_STANDARD,
            },
            {
                label: 'Création et Gestion des groupes de droits',
                navigate: ROUTE_PARAMETER_GROUPS_STANDARD,
            },
        ],
    },
];
