import { describe, it, beforeEach, expect, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import { ManageFiches } from '@organisms/fiches/ManageFiches';
import { useFiches, useFicheSubmit } from '@services/parameters/useFiche';
import userEvent from '@testing-library/user-event';
import { renderWithDataRouter } from './utils/renderWithDataRouter.tsx';

// Mocks
vi.mock('@services/parameters/useFiche', () => ({
    useFiches: vi.fn(),
    useFicheSubmit: vi.fn(),
}));

const mockedUseFiches = useFiches as ReturnType<typeof vi.fn>;
const mockedUseFicheSubmit = useFicheSubmit as ReturnType<typeof vi.fn>;

const mockFichesResponse = {
    '@context': '/api/contexts/Fiche',
    '@id': '/api/fiches',
    '@type': 'Collection',
    member: [
        {
            id: 'test1',
            idTerme: 'test1',
            archived: true,
        },
        {
            id: 'test2',
            idTerme: 'test2',
            configuration: '/api/fiches/test1',
            archived: true,
        },
        {
            id: 'test3',
            idTerme: 'test3',
            archived: false,
        },
        {
            id: 'test4',
            idTerme: 'test4',
            configuration: '/api/fiches/test1',
            archived: true,
        },
        {
            id: 'test6',
            idTerme: 'test6',
            configuration: '/api/fiches/test3',
            archived: true,
        },
        {
            id: 'test7',
            idTerme: 'test7',
            configuration: '/api/fiches/test3',
            archived: false,
        },
    ],
    totalItems: 6,
};

describe('ManageFiches hierarchy and archive logic', () => {
    const mutateMock = vi.fn();

    beforeEach(() => {
        mockedUseFiches.mockReturnValue({
            isLoading: false,
            data: mockFichesResponse,
        });

        mockedUseFicheSubmit.mockReturnValue({
            mutate: mutateMock,
        });

        renderWithDataRouter(<ManageFiches />);
    });

    it('should render parent and children correctly with archive state', async () => {
        // Ouvrir les deux parents (test1 et test3) pour révéler les enfants
        await userEvent.click(screen.getByTestId('cell-id-terme-test1'));
        await userEvent.click(screen.getByTestId('cell-id-terme-test3'));

        // Récupération de toutes les cellules visibles contenant les idTerme
        const cells = screen.getAllByTestId(/^cell-id-terme-/);
        const cellsText = cells.map((cell) => cell.textContent?.trim());

        expect(cellsText).toEqual([
            'test1', // parent
            'test2', // enfant de test1
            'test4', // enfant de test1
            'test3', // parent
            'test6', // enfant de test3
            'test7', // enfant de test3
        ]);

        // Vérifie que test2 et test4 sont désactivés (toggle switch disabled)
        for (const id of ['test2', 'test4']) {
            const row = screen
                .getByTestId(`cell-id-terme-${id}`)
                .closest('tr')!;
            const toggle = within(row).getByRole('switch');
            expect(toggle).toBeDisabled();
        }

        // Vérifie que test6 n’est pas désactivé (parent actif)
        const test6Row = screen
            .getByTestId('cell-id-terme-test6')
            .closest('tr')!;
        const toggle6 = within(test6Row).getByRole('switch');
        expect(toggle6).not.toBeDisabled();
    });

    it('should call mutate with parent and children when unarchiving', async () => {
        // Rendre test3 visible (parent)
        const test3Cell = screen.getByTestId('cell-id-terme-test3');
        const test3Row = test3Cell.closest('tr')!;
        const toggle = within(test3Row).getByRole('switch');

        // Clic sur le switch pour lancer l’unarchivage → déclenche le modal de confirmation
        await userEvent.click(toggle);

        // Simule le clic sur "Confirmer" dans la modale
        const confirmButton = await screen.findByRole('button', {
            name: /confirmer/i,
        });
        await userEvent.click(confirmButton);

        // Vérifie que la mutation a été appelée pour le parent (test3)
        expect(mutateMock).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'test3',
                __method: 'PATCH',
                archived: true,
            })
        );
    });
});
