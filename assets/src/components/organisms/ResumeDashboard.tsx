import { ArrowDownToLine, Plus } from 'lucide-react';

export function ResumeDashboard() {
    // TODO CSS review with dev this feature

    return (
        <div
            className="flex justify-between items-center px-4 py-3 rounded-md shadow-sm"
            style={{ boxShadow: '0 1px 4px var(--box-shadow-color)' }}
        >
            <div className="text-sm text-[var(--text-color)] flex flex-wrap gap-x-2 gap-y-1">
                <span>
                    <strong>Vus :</strong> 7 (5 Urgences, 2 UHCD) -
                </span>
                <span>
                    <strong>Non vus :</strong> 6 (6 Urgences, 0 UHCD) -
                </span>
                <span>
                    <strong>Attendus :</strong> 0 -
                </span>
                <span className="text-[var(--text-color-alert)] font-bold">
                    Aujourd'hui : 0 -
                </span>
                <span>Durée moyenne de séjour : -- min.</span>
            </div>

            <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-[var(--background-button-color-hover)] transition-colors">
                    <Plus size={20} />
                </button>
                <button className="p-1 rounded hover:bg-[var(--background-button-color-hover)] transition-colors">
                    <ArrowDownToLine size={20} />
                </button>
            </div>
        </div>
    );
}
