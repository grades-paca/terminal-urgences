import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './Tab.module.scss';

export const Tab = ({
    children,
    isActive,
}: {
    children: ReactNode;
    isActive?: boolean;
}) => {
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

    return (
        <div
            ref={containerRef}
            title={tooltip}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
        >
            {children}
        </div>
    );
};
