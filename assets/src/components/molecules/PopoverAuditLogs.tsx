import { Popover } from 'flowbite-react';
import type { AuditLog } from '@interfaces/AuditLog.ts';

interface PopoverProps {
    trigger: 'hover' | 'click' | undefined;
    logs: Array<AuditLog>;
}

export const PopoverAuditLogs = ({ trigger, logs }: PopoverProps) => {
    if (!logs || logs.length === 0) return '—';

    const latest = logs[0];
    const date = new Date(latest.timestamp).toLocaleString('fr-FR');
    const user = latest.user?.username ?? 'inconnu';
    const label = `${latest.action === 'create' ? 'Créé' : 'Modifié'} le ${date} par ${user}`;

    return (
        <Popover
            trigger={trigger}
            content={
                <div className="w-72 text-sm text-[var(--color-secondary-700)]">
                    <div className="border-b border-[var(--color-secondary-300)] bg-[var(--color-secondary-100)] px-3 py-2">
                        <h3 className="font-semibold text-[var(--color-secondary-900)]">
                            {latest.action === 'create' ? 'Créé' : 'Modifié'}
                        </h3>
                    </div>
                    <div className="px-3 py-2">
                        {logs.map((log, i) => (
                            <div
                                key={i}
                                className="mb-3 border-b pb-2 last:border-0 last:pb-0"
                            >
                                <div className="font-medium">
                                    {new Date(log.timestamp).toLocaleString(
                                        'fr-FR'
                                    )}
                                </div>
                                <div>
                                    Par : {log.user?.username ?? 'inconnu'}
                                </div>
                                {log.changes && (
                                    <div className="mt-1">
                                        <div className="font-semibold">
                                            Changements :
                                        </div>
                                        <ul className="ml-4 list-disc">
                                            {Object.entries(log.changes).map(
                                                ([key, [before, after]]) => (
                                                    <li key={key}>
                                                        <span className="italic">
                                                            {key}
                                                        </span>{' '}
                                                        : «{' '}
                                                        {String(before ?? '—')}{' '}
                                                        » → «{' '}
                                                        {String(after ?? '—')} »
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            }
        >
            <div>{label}</div>
        </Popover>
    );
};
