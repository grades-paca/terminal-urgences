import { type ReactNode, useRef } from 'react';
import {
    type ViewType,
    VIEW_DASHBOARD_TYPE,
    VIEW_PARAMETER_TYPE,
} from '@interfaces/View';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '@organisms/DropdownMenu.tsx';

import styles from './Tab.module.scss';

export const Tab = ({
    children,
    isActive,
    type,
    id,
    dataTestId,
}: {
    children: ReactNode;
    isActive?: boolean;
    type?: ViewType;
    id?: number;
    dataTestId?: string;
}) => {
    const navigate = useNavigate();
    const textRef = useRef<HTMLSpanElement>(null);

    const isParamTab = type === VIEW_PARAMETER_TYPE;

    function handleClick() {
        switch (type) {
            case VIEW_DASHBOARD_TYPE:
                navigate(`/dashboard/${id}`);
                break;
            case VIEW_PARAMETER_TYPE:
                break;
            default:
                navigate('/');
        }
    }

    return (
        <div
            className={`
                flex items-center gap-1 rounded-t-md transition-colors cursor-pointer
                ${isActive ? styles.tabActive : styles.tabInactive}
                ${isParamTab ? '' : 'px-2 py-1'}
            `}
            onClick={handleClick}
            role={'tab'}
            data-testid={dataTestId}
        >
            {isParamTab ? (
                <DropdownMenu>{children}</DropdownMenu>
            ) : (
                <span ref={textRef} className="max-w-full">
                    {children}
                </span>
            )}
        </div>
    );
};
