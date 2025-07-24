import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

const LONG_INPUT = 'a'.repeat(256);
export const INPUT_COMPLET = `abcABC123 !@#€%&+=-_/.,;:()[[]]{{}}"'\\|^~\`*<>🙂çôé💡🚀`;
export const ALPHANUM_SANITIZED = 'abcABC123';
export const LARGE_TEXT_SANITIZED = `abcABC123 !@#€%&+=-_/.,;:()[]]{}}"'çôé`;

export async function testSanitizedInput({
    field,
    expectedSanitized,
    expectedMaxLength,
}: {
    field: HTMLInputElement;
    expectedSanitized: string;
    expectedMaxLength: number;
}) {
    await userEvent.clear(field);
    await userEvent.type(field, LONG_INPUT);

    await waitFor(() => {
        expect(field).toHaveValue(LONG_INPUT.slice(0, expectedMaxLength));
    });

    await userEvent.clear(field);
    await userEvent.type(field, INPUT_COMPLET);
    await userEvent.tab();

    await waitFor(() => {
        expect(field).toHaveValue(expectedSanitized);
    });
}
