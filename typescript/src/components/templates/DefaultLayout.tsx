import { LoginForm } from '@organisms/LoginForm';
import { Navigation } from '@organisms/Navigation';
import { ReactNode, useEffect, useState } from 'react';
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
        <div className={styles.defaultLayout}>
            <header>
                <div className={styles.headerTopBar}>
                    <div className={styles.tilteContainer}>
                        <div className={styles.logoContainer}>
                            <Link to="/">
                                <div className={styles.logo}></div>
                            </Link>
                        </div>
                        <div className={styles.titleBlock}>
                            <div className={styles.title}>
                                <span>Terminal des Urgences - Dev</span>
                            </div>
                            <div className={styles.dateTime}>{dateTime}</div>
                        </div>
                    </div>

                    <LoginForm />
                </div>

                <Navigation />
            </header>

            <main>{children}</main>
        </div>
    );
};
