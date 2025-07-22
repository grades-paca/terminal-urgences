import { View, VIEW_DASHBOARD_TYPE } from '@interfaces/View';
import { useLocation } from 'react-router';

export function useTabActivityChecker() {
    const location = useLocation();

    return (view?: View): boolean => {
        let expectedPath = '/';
        if (view?.type === VIEW_DASHBOARD_TYPE && view.id !== undefined) {
            expectedPath = `/dashboard/${view.id}`;
        }
        return location.pathname === expectedPath;
    };
}
