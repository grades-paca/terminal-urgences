import { useTabActivityChecker } from '@hooks/useTabActivityChecker';
import { Tab } from '@molecules/Tab';
import { useConfigView } from '@services/config/useConfigView';
import { Cog, House } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { VIEW_PARAMETER_TYPE } from '@interfaces/View.ts';
import { useMe } from '@services/auth/useMe.tsx';

import styles from './Navigation.module.scss';

export const Navigation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isTabActive = useTabActivityChecker();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { data: views, isLoading: isLoadingView } = useConfigView();

    const { data: user } = useMe();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            data-testid="navigation"
            ref={containerRef}
            className={`${styles.navigation} flex gap-1 px-2 pt-1 overflow-x-auto whitespace-nowrap scrollbar-hide`}
        >
            <Tab isActive={isTabActive()} dataTestId="tab-home">
                <House size={24} />
            </Tab>

            {!isMobile &&
                !isLoadingView &&
                views &&
                views.map((view, i) => (
                    <Tab
                        key={i}
                        type={view.type}
                        id={view.id}
                        isActive={isTabActive(view)}
                        dataTestId={`tab-views-${view.id}`}
                    >
                        {view.label}
                    </Tab>
                ))}

            {user && (
                <Tab
                    isActive={isTabActive({ type: VIEW_PARAMETER_TYPE })}
                    type={VIEW_PARAMETER_TYPE}
                    dataTestId="tab-cog"
                >
                    <Cog size={24} />
                </Tab>
            )}
        </div>
    );
};
