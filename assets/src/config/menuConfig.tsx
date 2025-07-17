import {ROUTE_PARAMETER_FICHES} from "@const/navigation.ts";

export type MenuItem =
    | {
          type: 'item';
          label: string;
          navigate: string;
      }
    | {
          type: 'submenu';
          label: string;
          children: MenuItem[];
      }
    | {
          type: 'separator';
      };

export const menuConfig: MenuItem[] = [
    {
        type: 'submenu',
        label: 'Gestion',
        children: [
            {
                type: 'item',
                label: 'Gestion et création des fiches',
                navigate: ROUTE_PARAMETER_FICHES,
            },
        ],
    },
    // {type: 'separator'},
    // {
    //     type: 'item',
    //     label: 'Déconnexion',
    //     navigate: '/',
    // },
];
