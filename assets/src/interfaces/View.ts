export const VIEW_DASHBOARD_TYPE = 'DASHBOARD' as const;

export const VIEW_LIST_TYPE = [VIEW_DASHBOARD_TYPE] as const;

export type ViewType = (typeof VIEW_LIST_TYPE)[number];

export interface View {
    id: number;
    label: string;
    type: ViewType;
}
