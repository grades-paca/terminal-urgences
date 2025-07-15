import { Info } from 'lucide-react';
import React from 'react';

interface InfoProps {
    children: React.ReactNode;
    title?: string;
}

export const InfoCard = ({ children, title }: InfoProps) => {
    return (
        <section className="border border-[var(--border-color)] rounded-lg bg-[var(--background-modal-color)] overflow-hidden">
            <header className="flex items-center gap-2 pl-2 text-[var(--text-color-modal)] bg-[var(--background-header-color)]">
                <Info size={20} className="text-[var(--text-color-modal)]" />
                <h2>{title}</h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-2 pb-4">
                {children}
            </div>
        </section>
    );
};
