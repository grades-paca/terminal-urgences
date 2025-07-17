import { Info } from 'lucide-react';
import React from 'react';

import styles from './InfoCard.module.scss';

interface InfoProps {
    children: React.ReactNode;
    title?: string;
}

export const InfoCard = ({ children, title }: InfoProps) => {
    return (
        <section
            className={`border rounded-lg overflow-hidden ${styles.infoCard}`}
        >
            <header className="flex items-center gap-2 pl-2">
                <Info size={20} />
                <h2>{title}</h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-2 pb-4">
                {children}
            </div>
        </section>
    );
};
