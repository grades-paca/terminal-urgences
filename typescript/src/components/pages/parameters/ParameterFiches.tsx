import { Popover, TabItem, Tabs } from "flowbite-react";
import { CircleQuestionMark, Lock } from "lucide-react";
import {TUTOS_LINK} from "@const/const.ts";

export const ParameterFiches = () => {
    const rights = [true, false, false];
    const subLink = 'admin-gestion-gestion-fiches-et-vues';

    const tabsItems = [
        {
            label: 'Création et gestion des fiches',
            content: 'Contenu 1',
            link: TUTOS_LINK + subLink,
        },
        {
            label: 'Configuration des fiches',
            content: 'Contenu 2',
            link: TUTOS_LINK + subLink,
        },
        {
            label: 'Gestion des transferts entres fiches',
            content: 'Contenu 3',
            link: TUTOS_LINK + subLink,
        },
    ];

    const unauthorized = (
        <div className="m-2 text-sm text-normal">
            Vous ne disposez pas des droits
        </div>
    );

    return (
        <div className="mx-auto w-fit">
            <Tabs variant="underline">
                {tabsItems.map((item, index) => {
                    const allowed = rights[index];

                    const baseTitle = (
                        <div className="flex items-center gap-1">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pop-up-link"
                            >
                                <CircleQuestionMark size={14} />
                            </a>
                            {item.label}
                        </div>
                    );

                    const title = allowed ? (
                        baseTitle
                    ) : (
                        <Popover trigger="hover" placement="top" content={unauthorized}>
                            <div className="flex items-center gap-1">
                                {baseTitle}
                                <Lock size={14} className="text-gray-400" />
                            </div>
                        </Popover>
                    );

                    return (
                        <TabItem key={index} disabled={!allowed} title={title}>
                            {allowed ? item.content : unauthorized}
                        </TabItem>
                    );
                })}
            </Tabs>
        </div>
    );
};
