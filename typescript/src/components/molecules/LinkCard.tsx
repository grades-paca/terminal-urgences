import { Card } from 'flowbite-react';
import React from 'react';

interface LinkCardProps {
    logo: React.ReactNode;
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
        <a href={href} target="_blank" rel="noopener noreferrer">
            <Card>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                        {logo}
                    </div>
                    <div className="flex flex-col">
                        <h5 className="text-base font-semibold">{title}</h5>
                        <p className="text-sm mt-1">{description}</p>
                    </div>
                </div>
            </Card>
        </a>
    );
};
