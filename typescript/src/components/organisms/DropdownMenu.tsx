import {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight } from 'lucide-react';
import { menuConfig, type MenuItem } from '@config/menuConfig';
import { useNavigate } from 'react-router';

interface Props {
    children: ReactNode;
}

interface Coords {
    top: number;
    left: number;
}

const OFFSET = 4;

export default function DropdownMenu({ children }: Props) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (open && btnRef.current && menuRef.current) {
            const btnRect = btnRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            let top = btnRect.bottom + OFFSET;
            let left = btnRect.left;

            if (left + menuRect.width > window.innerWidth) {
                left = window.innerWidth - menuRect.width - OFFSET;
            }
            if (top + menuRect.height > window.innerHeight) {
                top = btnRect.top - menuRect.height - OFFSET;
            }
            setCoords({ top, left });
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
                        className="absolute z-[9999] w-44 rounded-md border border-default bg-surface
                        mt-2 -ml-2 shadow-default transition transform origin-top-left
                        animate-[fadeIn_150ms_ease-out] motion-reduce:animate-none"
                        style={{ top: coords.top, left: coords.left }}
                        role="menu"
                    >
                        <MenuList items={menuConfig} />
                    </div>,
                    document.body
                )}
        </>
    );
}

// Rendu récursif du menu
function MenuList({ items }: { items: MenuItem[] }) {
    const navigate = useNavigate();

    return (
        <div className="py-1">
            {items.map((item, index) => {
                if (item.type === 'separator') {
                    return (
                        <div key={index} className="my-1 h-px bg-gray-200" />
                    );
                }
                if (item.type === 'item') {
                    return (
                        <button
                            key={index}
                            className="block w-full px-4 py-2 text-left text-sm bg-surface text-normal bg-hover"
                            role="menuitem"
                            onClick={() => navigate(item.navigate)}
                        >
                            {item.label}
                        </button>
                    );
                }
                if (item.type === 'submenu') {
                    return (
                        <SubMenu
                            key={index}
                            label={item.label}
                            childrenItems={item.children}
                        />
                    );
                }
            })}
        </div>
    );
}

function SubMenu({
    label,
    childrenItems,
}: {
    label: string;
    childrenItems: MenuItem[];
}) {
    const [subOpen, setSubOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const openSub = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setSubOpen(true);
    };
    const closeSub = () => {
        timeoutRef.current = setTimeout(() => setSubOpen(false), 150);
    };

    return (
        <div
            className="relative"
            onMouseEnter={openSub}
            onMouseLeave={closeSub}
        >
            <button
                className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded={subOpen}
            >
                {label}
                <ChevronRight className="h-4 w-4 shrink-0" />
            </button>

            {subOpen && (
                <div
                    className="absolute left-full top-0 z-[9999] -mt-1 w-56 rounded-md border border-default bg-surface shadow-default"
                    role="menu"
                    onMouseEnter={openSub}
                    onMouseLeave={closeSub}
                >
                    <MenuList items={childrenItems} />
                </div>
            )}
        </div>
    );
}
