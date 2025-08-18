import { HelperText, TextInput, type TextInputProps } from 'flowbite-react';
import { LabelInput } from '@atoms/LabelInput.tsx';

export const LabelTextInput = ({
    id,
    dataTestId,
    label,
    value,
    onChange,
    error,
    ...rest
}: {
    id: string;
    label: string;
    dataTestId?: string;
    value: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
} & Omit<TextInputProps, 'value' | 'onChange'>) => (
    <div className="flex flex-col">
        <LabelInput id={id} required={rest.required} label={label} />
        <TextInput
            id={id}
            data-testid={dataTestId ?? id}
            value={value}
            onChange={onChange}
            color={error ? 'failure' : undefined}
            {...rest}
        />
        {error && (
            <HelperText
                color="failure"
                data-testid={`${dataTestId ?? id}-error`}
            >
                {error}
            </HelperText>
        )}
    </div>
);
