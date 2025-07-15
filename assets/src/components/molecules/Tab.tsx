import {type ReactNode, useRef} from 'react';
import {
    type ViewType,
    VIEW_DASHBOARD_TYPE,
    VIEW_PARAMETER_TYPE,
} from '@interfaces/View';
import {useNavigate} from 'react-router';
import DropdownMenu from '@organisms/DropdownMenu.tsx';

export const Tab = (
    {
        children,
        isActive,
        type,
        id,
        dataTestId
    }: {
        children: ReactNode,
        isActive?: boolean,
        type?: ViewType,
        id?: number,
        dataTestId?: string
    }
) => {
    const navigate = useNavigate();
    const textRef = useRef<HTMLSpanElement>(null);

    const isParamTab = type === VIEW_PARAMETER_TYPE;

    const baseClasses = `flex items-center gap-1 rounded-t-md transition-colors cursor-pointer`;
    const inactiveClasses = `bg-[var(--background-tab-color-inactive)] text-[var(--background-tab-text-color-inactive)]
        hover:bg-[var(--background-tab-color-inactive-hover)] hover:text-[var(--background-tab-text-color-inactive-hover)]`;
    const activeClasses = `bg-[var(--background-tab-color-active)] text-[var(--background-tab-text-color-active)]`;

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
                ${baseClasses} ${isActive ? activeClasses : inactiveClasses}
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
