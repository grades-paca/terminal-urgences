import {
    VIEW_DASHBOARD_TYPE,
    VIEW_PARAMETER_TYPE,
    type ViewType,
} from '@interfaces/View';
import { useLocation } from 'react-router';

export function useTabActivityChecker() {
    const location = useLocation();

    return ({ type, id }: { type?: ViewType; id?: number } = {}): boolean => {
        let expectedPath = '/';

        switch (type) {
            case VIEW_DASHBOARD_TYPE:
                if (id !== undefined) {
                    expectedPath = `/dashboard/${id}`;
                }
                break;
            case VIEW_PARAMETER_TYPE:
                expectedPath = `/parameter/fiches`;
                break;
        }

        return location.pathname === expectedPath;
    };
}
