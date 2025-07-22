import React from 'react';
import styles from './LinkCard.module.scss';

interface LinkCardProps {
    logo: React.ReactNode; // Ex: <SomeLucideIcon />
    title: string;
    description: string;
    href: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({
    logo,
    title,
    description,
    href,
}) => {
    return (
        <a
            href={href}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className={styles.logo}>{logo}</div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </a>
    );
};
