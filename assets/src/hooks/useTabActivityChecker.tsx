import { useLocation, matchPath } from 'react-router-dom';
import {
    VIEW_DASHBOARD_TYPE,
    VIEW_PARAMETER_TYPE,
    type ViewType,
} from '@interfaces/View.ts';

export function useTabActivityChecker() {
    const location = useLocation();

    return ({
        type,
        view,
    }: { type?: ViewType; view?: number | string } = {}): boolean => {
        switch (type) {
            case VIEW_DASHBOARD_TYPE:
                if (view !== undefined) {
                    return location.pathname === `/dashboard/${view}`;
                }
                return !!matchPath(
                    { path: '/dashboard/*', end: false },
                    location.pathname
                );

            case VIEW_PARAMETER_TYPE:
                return (
                    !!matchPath(
                        { path: '/parameter/*', end: false },
                        location.pathname
                    ) || location.pathname === '/parameter'
                );

            default:
                return (
                    !!matchPath({ path: '/', end: true }, location.pathname) ||
                    location.pathname === '/'
                );
        }
    };
}
