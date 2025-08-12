import { useEffect, useRef } from 'react';
import { unstable_usePrompt } from 'react-router-dom';

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
    // Mémorise la dernière valeur de isDirty
    const dirtyRef = useRef(isDirty);
    useEffect(() => {
        dirtyRef.current = isDirty;
    }, [isDirty]);

    /** Fermeture explicite (Annuler, croix…) */
    const confirmAndClose = () => {
        if (dirtyRef.current) {
            const ok = window.confirm(
                'Des modifications non sauvegardées seront perdues. Voulez-vous vraiment fermer ?'
            );
            if (!ok) return;
        }
        onClose();
    };

    // Intercepte les navigations internes via React Router
    unstable_usePrompt({
        when: openModal && isDirty,
        message:
            'Des modifications non sauvegardées seront perdues. Voulez-vous vraiment quitter cette page ?',
    });

    // Intercepte les rechargements/fermetures d’onglet
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
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
