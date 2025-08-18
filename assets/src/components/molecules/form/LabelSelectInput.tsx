import { Select, HelperText } from 'flowbite-react';
import type { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react';
import { LabelInput } from '@atoms/LabelInput.tsx';

export const LabelSelectInput = ({
    id,
    dataTestId,
    label,
    value,
    onChange,
    error,
    children,
    ...rest
}: {
    id: string;
    dataTestId?: string;
    label: string;
    value: string | undefined;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) => {
    return (
        <div className="flex flex-col gap-1">
            <LabelInput id={id} required={rest.required} label={label} />
            <Select
                id={id}
                data-testid={dataTestId ?? id}
                value={value}
                onChange={onChange}
                color={error ? 'failure' : undefined}
                {...rest}
            >
                {children}
            </Select>
            {error && <HelperText color="failure">{error}</HelperText>}
        </div>
    );
};
