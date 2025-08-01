import { LoginForm } from '@organisms/LoginForm';
import { Navigation } from '@organisms/Navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router';

import styles from './DefaultLayout.module.scss';

interface DefaultLayoutProps {
    children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formatted = now
                .toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
                .replace(',', '');
            setDateTime(formatted);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen">
            <header className="bg-[var(--background-header-color)] text-white">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-8 py-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                        <div className="flex items-center">
                            <Link to="/">
                                <div className={styles.logo} />
                            </Link>
                        </div>

                        <div className="flex flex-col">
                            <div className="text-white font-bold text-xl md:text-2xl">
                                Terminal des Urgences - Dev
                            </div>
                            <div className="text-white font-bold text-lg md:text-xl">
                                {dateTime}
                            </div>
                        </div>
                    </div>

                    <LoginForm />
                </div>

                <Navigation />
            </header>

            <main className="p-2">{children}</main>
        </div>
    );
};
