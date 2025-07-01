import { Tab } from '@molecules/Tab';
import { House } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useConfigView } from '@features/config/useConfigView';
import styles from './Navigation.module.scss';

export const Navigation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const isActive = useMemo(() => true, []);

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

    return !isMobile ? (
        <div className={styles.tabBar} ref={containerRef}>
            <div className={`${styles.tab} ${isActive ? styles.active : ''}`}>
                <Tab isActive={isActive}>
                    <House size={24} />
                </Tab>
            </div>

            {!isLoadingView &&
                views &&
                views.map((view, i) => <Tab key={i}>{view.label}</Tab>)}
        </div>
    ) : (
        <div>Coucou</div>
    );
};
