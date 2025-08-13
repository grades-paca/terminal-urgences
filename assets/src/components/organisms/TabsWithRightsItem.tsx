import { Popover, TabItem, Tabs } from 'flowbite-react';
import { CircleQuestionMark, Lock } from 'lucide-react';
import type { ReactNode } from 'react';

export type TabType = 'standard' | 'conf' | 'transfer' | string;

export type TabsWithRightsItem = {
    id: string;
    label: string;
    content: ReactNode;
    link?: string;
    allowed: boolean;
    type?: TabType;
};

type TabsWithRightsProps = {
    items: TabsWithRightsItem[];
    activeId?: string;
    unauthorizedContent?: ReactNode;
    tabsAriaLabel?: string;
};

export const TabsWithRights = ({
    items,
    activeId,
    unauthorizedContent = (
        <div className="m-2 text-sm text-normal">
            Vous ne disposez pas des droits
        </div>
    ),
    tabsAriaLabel = 'Full width tabs',
}: TabsWithRightsProps) => {
    return (
        <div className="overflow-x-auto">
            <Tabs aria-label={tabsAriaLabel} variant="fullWidth">
                {items.map((item) => {
                    const labelCore = (
                        <div className="flex items-center gap-1">
                            <span>{item.label}</span>
                            {!item.allowed && (
                                <Lock size={14} className="text-gray-400" />
                            )}
                        </div>
                    );

                    const titleWithPopover = item.allowed ? (
                        labelCore
                    ) : (
                        <Popover
                            trigger="hover"
                            placement="top"
                            content={unauthorizedContent}
                        >
                            {labelCore}
                        </Popover>
                    );

                    const title = (
                        <div className="relative flex justify-center items-center w-full px-2">
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute left-0 top-0 pop-up-link"
                                >
                                    <CircleQuestionMark size={14} />
                                </a>
                            )}
                            {titleWithPopover}
                        </div>
                    );

                    return (
                        <TabItem
                            key={item.id}
                            title={title}
                            disabled={!item.allowed}
                            active={item.id === activeId}
                        >
                            {item.allowed ? item.content : unauthorizedContent}
                        </TabItem>
                    );
                })}
            </Tabs>
        </div>
    );
};
