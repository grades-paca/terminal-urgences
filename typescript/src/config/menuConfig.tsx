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
                navigate: '/parameter/fiches',
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
