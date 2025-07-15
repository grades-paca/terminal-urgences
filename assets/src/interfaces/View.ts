export const VIEW_DASHBOARD_TYPE = 'DASHBOARD' as const;
export const VIEW_PARAMETER_TYPE = 'PARAMETER' as const;

export const VIEW_LIST_TYPE = [
    VIEW_DASHBOARD_TYPE,
    VIEW_PARAMETER_TYPE,
] as const;

export type ViewType = (typeof VIEW_LIST_TYPE)[number];

export interface View {
    id: number;
    label: string;
    type: ViewType;
}
