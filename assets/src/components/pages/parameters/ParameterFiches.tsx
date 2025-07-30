import { Popover, TabItem, Tabs } from 'flowbite-react';
import { CircleQuestionMark, Lock } from 'lucide-react';
import { TUTOS_LINK } from '@const/const.ts';
import { ManageFiches } from '@organisms/fiches/ManageFiches.tsx';
import { useParams } from 'react-router-dom';

export const ParameterFiches = () => {
    // TODO feature access not exist
    const { viewType } = useParams();
    const rights = [true, true, false];
    const subLink = 'admin-gestion-gestion-fiches-et-vues';

    const tabsItems = [
        {
            label: 'Création et gestion des fiches',
            content: <ManageFiches />,
            type: 'standard',
            link: TUTOS_LINK + subLink,
        },
        {
            label: 'Configuration des fiches',
            content: 'Contenu 2',
            type: 'conf',
            link: TUTOS_LINK + subLink,
        },
        {
            label: 'Gestion des transferts entres fiches',
            content: 'Contenu 3',
            type: 'transfer',
            link: TUTOS_LINK + subLink,
        },
    ];

    const unauthorized = (
        <div className="m-2 text-sm text-normal">
            Vous ne disposez pas des droits
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <Tabs aria-label="Full width tabs" variant="fullWidth">
                {tabsItems.map((item, index) => {
                    const allowed = rights[index];

                    const label = (
                        <div className="flex items-center gap-1">
                            <span>{item.label}</span>
                            {!allowed && (
                                <Lock size={14} className="text-gray-400" />
                            )}
                        </div>
                    );

                    const centeredTitle = allowed ? (
                        label
                    ) : (
                        <Popover
                            trigger="hover"
                            placement="top"
                            content={unauthorized}
                        >
                            {label}
                        </Popover>
                    );

                    const title = (
                        <div className="relative flex justify-center items-center w-full px-2">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute left-0 top-0 pop-up-link"
                            >
                                <CircleQuestionMark size={14} />
                            </a>
                            {centeredTitle}
                        </div>
                    );

                    return (
                        <TabItem
                            active={item.type === viewType}
                            key={index}
                            disabled={!allowed}
                            title={title}
                        >
                            {allowed ? item.content : unauthorized}
                        </TabItem>
                    );
                })}
            </Tabs>
        </div>
    );
};
