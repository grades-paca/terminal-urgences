import { useTabActivityChecker } from '@hooks/useTabActivityChecker';
import { Tab } from '@molecules/Tab';
import { useConfigView } from '@services/config/useConfigView';
import { House } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import styles from './Navigation.module.scss';

export const Navigation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isTabActive = useTabActivityChecker(); // hook appelé une seule fois

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const { data: views, isLoading: isLoadingView } = useConfigView();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
                return;
            } else {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.tabBar} ref={containerRef}>
            <Tab isActive={isTabActive()}>
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
                    >
                        {view.label}
                    </Tab>
                ))}
        </div>
    );
};
