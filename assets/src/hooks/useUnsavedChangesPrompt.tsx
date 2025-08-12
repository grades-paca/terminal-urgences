import { useEffect, useRef } from 'react';

interface Options {
    openModal: boolean;
    isDirty: boolean;
    onClose: () => void;
}

export function useUnsavedChangesPrompt({
    openModal,
    isDirty,
    onClose,
}: Options) {
    // Mémorise la dernière valeur de isDirty pour le handler popstate
    const dirtyRef = useRef(isDirty);
    useEffect(() => {
        dirtyRef.current = isDirty;
    }, [isDirty]);

    /** Fermeture explicite demandée par un bouton (Annuler, croix...) */
    const confirmAndClose = () => {
        if (dirtyRef.current) {
            const ok = window.confirm(
                'Des modifications non sauvegardées seront perdues. Voulez-vous vraiment fermer ?'
            );
            if (!ok) return;
        }
        onClose();
    };

    // Intercepte le retour arrière du navigateur sans manipuler l’historique
    useEffect(() => {
        if (!openModal) return;

        const handlePopState = () => {
            if (!openModal) return;

            if (dirtyRef.current) {
                const ok = window.confirm(
                    'Des modifications non sauvegardées seront perdues. Voulez-vous vraiment quitter cette page ?'
                );
                if (ok) {
                    onClose(); // ferme la modale et laisse le retour se poursuivre
                } else {
                    // annule le retour en allant de nouveau vers l’avant ; s’il n’y a rien devant, cela ne fait rien
                    window.history.forward();
                }
            } else {
                onClose();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [openModal, onClose]);

    // beforeunload pour les vraies navigations (fermeture d’onglet, rechargement, changement de domaine)
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Ne bloque que si la modale est ouverte et qu’il y a des modifications
            if (openModal && dirtyRef.current) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [openModal]);

    return { confirmAndClose };
}
