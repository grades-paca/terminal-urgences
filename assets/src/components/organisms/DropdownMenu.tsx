import {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import {
    menuConfig,
    type MenuItem,
    type SectionMenuItem,
} from '@config/menuConfig';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

interface Coords {
    top: number;
}

const OFFSET = 0;

export default function DropdownMenu({ children }: Props) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState<Coords>({ top: 0 });
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (open && btnRef.current && menuRef.current) {
            const btnRect = btnRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            let top = btnRect.bottom + OFFSET;

            if (top + menuRect.height > window.innerHeight) {
                top = btnRect.top - menuRect.height - OFFSET;
            }
            setCoords({ top });
        }
    }, [open]);

    useEffect(() => {
        const handler = (e: PointerEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !btnRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('pointerdown', handler, true);
        return () => document.removeEventListener('pointerdown', handler, true);
    }, [open]);

    return (
        <>
            <button
                ref={btnRef}
                onClick={() => setOpen((v) => !v)}
                className="focus:outline-none px-2 py-1 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                {children}
            </button>

            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        className={`absolute z-[9999] w-full
                            transition transform origin-top-left
                            animate-[fadeIn_150ms_ease-out] motion-reduce:animate-none
                            standardBackground`}
                        style={{ top: coords.top }}
                        role="menu"
                    >
                        <ConfigGrid config={menuConfig} setOpen={setOpen} />
                    </div>,
                    document.body
                )}
        </>
    );
}

function ConfigGrid({
    config,
    setOpen,
}: {
    config: MenuItem[];
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-2">
            {config.map((block: MenuItem, i: number) => (
                <div
                    key={i}
                    className="border border-[var(--color-primary-600)] rounded bg-[var(--color-primary-200)]"
                >
                    <div className="bg-[var(--color-primary-600)] text-[var(--color-secondary-50)] font-bold p-2 text-sm">
                        {block.title}
                    </div>
                    <ul className="divide-y text-sm">
                        {block.sections.map(
                            (section: SectionMenuItem, j: number) => {
                                const enableLink =
                                    section.navigate !== undefined &&
                                    section.locked !== true;

                                return (
                                    <li
                                        key={j}
                                        className={`flex items-center justify-between px-2 py-1 w-full
                                        bg-[var(--color-secondary-100)]
                                        text-[var(--color-secondary-900)]
                                        ${enableLink ? 'cursor-pointer hover:bg-[var(--color-primary-500)] hover:text-[var(--color-secondary-50)]' : ''}`}
                                        onClick={() => {
                                            if (enableLink) {
                                                const path =
                                                    section.navigate ?? '';

                                                navigate(path);
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        <span>{section.label}</span>
                                        <span className="flex gap-1">
                                            {section.locked && <Lock />}
                                        </span>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}
