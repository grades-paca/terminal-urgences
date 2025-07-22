import { Info } from 'lucide-react';
import React from 'react';
import styles from './InfoCard.module.scss';

interface InfoProps {
    children: React.ReactNode;
    title?: string;
}

export const InfoCard = ({ children, title }: InfoProps) => {
    return (
        <section className={styles.infoContainer}>
            <header className={styles.header}>
                <Info size={20} className={styles.icon} />
                <h2>{title}</h2>
            </header>
            <div className={styles.grid}>{children}</div>
        </section>
    );
};
