import {
    VIEW_DASHBOARD_TYPE,
    VIEW_PARAMETER_TYPE,
    type ViewType,
} from '@interfaces/View';
import { useLocation } from 'react-router';

export function useTabActivityChecker() {
    const location = useLocation();

    return ({
        type,
        view,
    }: { type?: ViewType; view?: number | string } = {}): boolean => {
        let expectedPath = '/';

        switch (type) {
            case VIEW_DASHBOARD_TYPE:
                if (view !== undefined) {
                    expectedPath = `/dashboard/${view}`;
                }
                break;
            case VIEW_PARAMETER_TYPE:
                expectedPath =
                    view !== undefined
                        ? `/parameter/fiches/${view}`
                        : `/parameter/fiches`;
                break;
        }

        return location.pathname === expectedPath;
    };
}
