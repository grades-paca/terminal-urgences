import type { ChangeEvent } from 'react';
import { HelperText, TextInput } from 'flowbite-react';
import { LabelSelectInput } from '@molecules/form/LabelSelectInput.tsx';

export const SCHEDULER_TYPES_H24 = 'H24' as const;
export const SCHEDULER_TYPES_PLAGE = 'plage' as const;

export type ModeH24Type =
    | typeof SCHEDULER_TYPES_H24
    | typeof SCHEDULER_TYPES_PLAGE;

export const ScheduleSelect = ({
    value,
    onChange,
    error,
}: {
    value: { modeH24: ModeH24Type; to?: string; from?: string };
    onChange: (v: { modeH24: ModeH24Type; to?: string; from?: string }) => void;
    error?: Record<string, string>;
}) => {
    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const modeH24 = e.target.value as ModeH24Type;
        onChange({ modeH24, to: '', from: '' });
    };

    const handleTimeChange = (field: 'to' | 'from', val: string) => {
        onChange({ ...value, [field]: val });
    };

    return (
        <div className="flex flex-col gap-2">
            <LabelSelectInput
                id="scheduleSelect"
                label={'Horaires d’application'}
                value={value.modeH24}
                onChange={handleModeChange}
                required
            >
                <option value="H24">H24</option>
                <option value="plage">De ——— à ———</option>
            </LabelSelectInput>

            {value.modeH24 === 'plage' && (
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="text-xs" htmlFor="schedule-from">
                            Début
                        </label>
                        <TextInput
                            id="schedule-from"
                            type="time"
                            value={value.from || ''}
                            onChange={(e) =>
                                handleTimeChange('from', e.target.value)
                            }
                            className={`${error?.from ? 'border-[var(--color-alert)]' : ''}`}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs" htmlFor="schedule-to">
                            Fin
                        </label>
                        <TextInput
                            id="schedule-to"
                            type="time"
                            value={value.to || ''}
                            onChange={(e) =>
                                handleTimeChange('to', e.target.value)
                            }
                            className={`${error?.to ? 'border-[var(--color-alert)]' : ''}`}
                            required
                        />
                    </div>
                </div>
            )}

            {(error?.from || error?.to) && (
                <HelperText color="failure">
                    {error?.from ?? error?.to}
                </HelperText>
            )}
        </div>
    );
};
