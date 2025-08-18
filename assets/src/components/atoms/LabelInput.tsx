import { Label } from 'flowbite-react';

interface LabelInputProps {
    id: string;
    required: boolean | undefined;
    label: string;
}

export const LabelInput = ({ id, required, label }: LabelInputProps) => {
    return (
        <Label htmlFor={id}>
            {label}{' '}
            {required ? (
                <span className="text-[var(--color-alert)]">*</span>
            ) : undefined}
        </Label>
    );
};
