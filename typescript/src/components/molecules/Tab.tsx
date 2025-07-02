import { ReactNode, useEffect, useRef, useState } from 'react';

import { ViewType, VIEW_DASHBOARD_TYPE } from '@interfaces/View';
import { useNavigate } from 'react-router';
import styles from './Tab.module.scss';

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
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={handleNavigate}
        >
            {children}
        </div>
    );
};
