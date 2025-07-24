import { Label, Select, HelperText } from 'flowbite-react';
import type { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react';

export const LabelSelectInput = ({
    id,
    label,
    value,
    onChange,
    error,
    children,
    ...rest
}: {
    id: string;
    label: string;
    value: string | undefined;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) => {
    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={id}>{label}</Label>
            <Select
                id={id}
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
