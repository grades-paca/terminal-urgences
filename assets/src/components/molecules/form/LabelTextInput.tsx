import {
    HelperText,
    Label,
    TextInput,
    type TextInputProps,
} from 'flowbite-react';

export const LabelTextInput = ({
    id,
    label,
    value,
    onChange,
    error,
    ...rest
}: {
    id: string;
    label: string;
    value: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
} & Omit<TextInputProps, 'value' | 'onChange'>) => (
    <div className="flex flex-col">
        <Label htmlFor={id}>{label}</Label>
        <TextInput
            id={id}
            value={value}
            onChange={onChange}
            color={error ? 'failure' : undefined}
            {...rest}
        />
        {error && <HelperText color="failure">{error}</HelperText>}
    </div>
);
