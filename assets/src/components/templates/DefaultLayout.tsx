import { LoginForm } from '@organisms/LoginForm';
import { Navigation } from '@organisms/Navigation';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';

export const DefaultLayout = () => {
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
        <div>
            <header className={`${styles.header} standardBackground`}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-8 py-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                        <div className="flex items-center">
                            <Link to="/">
                                <div className={styles.logo} />
                            </Link>
                        </div>

                        <div className="flex flex-col">
                            <div className="font-bold text-xl md:text-2xl">
                                Terminal des Urgences - Dev
                            </div>
                            <div className="font-bold text-lg md:text-xl">
                                {dateTime}
                            </div>
                        </div>
                    </div>

                    <LoginForm />
                </div>

                <Navigation />
            </header>

            <main className="p-2">
                <Outlet />
            </main>
        </div>
    );
};
