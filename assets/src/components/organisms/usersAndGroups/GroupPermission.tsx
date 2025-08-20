import { useState } from 'react';
import type { UserGroup } from '@interfaces/UserGroup.ts';
import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    Tabs,
    TabItem,
    ToggleSwitch,
} from 'flowbite-react';

export const GroupPermission = ({
    selectedItem,
}: {
    selectedItem: UserGroup;
}) => {
    const sections = [
        {
            title: 'Droits globaux',
            component: `test pour ${selectedItem.name}`,
        },
        { title: 'Onglets', component: `test pour ${selectedItem.name}` },
        { title: 'Gestion', component: `test pour ${selectedItem.name}` },
        { title: 'Fiches', component: `test pour ${selectedItem.name}` },
    ];
    const [useTabs, setUseTabs] = useState(false);

    return (
        <div
            className="space-y-4 bg-[var(--color-secondary-50)]"
            data-testid="groupPermission"
        >
            <div className="flex items-center gap-3">
                <ToggleSwitch
                    checked={useTabs}
                    label={
                        useTabs
                            ? 'Mode : Onglets'
                            : 'Mode : Grille + Accordéons'
                    }
                    onChange={setUseTabs}
                />
            </div>

            {useTabs ? (
                // --- MODE ONGLET ---
                <Tabs aria-label="Groupes de droits" variant="underline">
                    {sections.map(({ title, component }) => (
                        <TabItem key={title} title={title}>
                            <div className="rounded-lg shadow p-4">
                                {component}
                            </div>
                        </TabItem>
                    ))}
                </Tabs>
            ) : (
                // --- MODE GRILLE + ACCORDÉONS ---
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map(({ title, component }) => (
                        <div key={title} className="rounded-lg">
                            <Accordion collapseAll>
                                <AccordionPanel>
                                    <AccordionTitle>{title}</AccordionTitle>
                                    <AccordionContent>
                                        {component}
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
