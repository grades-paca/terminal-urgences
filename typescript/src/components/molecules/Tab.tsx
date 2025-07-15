import { type ReactNode, useEffect, useRef, useState } from 'react';
import { type ViewType, VIEW_DASHBOARD_TYPE } from '@interfaces/View';
import { useNavigate } from 'react-router';

export const Tab = ({
    children,
    isActive,
    type,
    id,
}: {
    children: ReactNode;
    isActive?: boolean;
    type?: ViewType;
    id?: number;
}) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const span = textRef.current;
        const container = containerRef.current;

        if (span && container) {
            setIsTruncated(span.scrollWidth > container.clientWidth);
        }
    }, [children]);

    const tooltip =
        isTruncated && typeof children === 'string' ? children : undefined;

    const baseClasses = `flex items-center gap-1 px-2 py-1 rounded-t-md transition-colors cursor-pointer`;
    const inactiveClasses = `bg-[var(--background-tab-color-inactive)] text-[var(--background-tab-text-color-inactive)]
        hover:bg-[var(--background-tab-color-inactive-hover)] hover:text-[var(--background-tab-text-color-inactive-hover)]`;
    const activeClasses = `bg-[var(--background-tab-color-active)] text-[var(--background-tab-text-color-active)]`;

    function handleNavigate() {
        if (!type) {
            navigate('/');
            return;
        }

        switch (type) {
            case VIEW_DASHBOARD_TYPE:
                navigate(`/dashboard/${id}`);
                break;
            default:
                navigate('/');
                break;
        }
    }

    return (
        <div
            ref={containerRef}
            title={tooltip}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            onClick={handleNavigate}
        >
            <span ref={textRef} className="truncate max-w-full">
                {children}
            </span>
        </div>
    );
};
