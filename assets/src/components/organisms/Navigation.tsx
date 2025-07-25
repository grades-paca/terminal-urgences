import { useTabActivityChecker } from '@hooks/useTabActivityChecker';
import { Tab } from '@molecules/Tab';
import { useConfigView } from '@services/config/useConfigView';
import { House } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WIDTH_MOBILE_SCREEN } from '@const/const.ts';

export const Navigation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isTabActive = useTabActivityChecker();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { data: views, isLoading: isLoadingView } = useConfigView();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < WIDTH_MOBILE_SCREEN);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex gap-1 bg-[var(--background-color-header)] px-2 pt-1 overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
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
