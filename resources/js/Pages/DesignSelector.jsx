import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import ConfiancaFiscal from '@/Components/DesignSelector/ConfiancaFiscal';
import EditorialMultissetorial from '@/Components/DesignSelector/EditorialMultissetorial';
import Institucional from '@/Components/DesignSelector/Institucional';
import '../../css/design-selector.css';

const DIRECTIONS = [
    {
        id: 'institucional',
        name: 'Institucional Evoluído',
        hint: 'DNA da logo, modernizado',
        swatches: ['#4A1FE8', '#221673', '#E5231B'],
        Component: Institucional,
    },
    {
        id: 'fiscal',
        name: 'Confiança Fiscal',
        hint: 'Fundação e fintech social',
        swatches: ['#15104A', '#2A198B', '#F5F6FA'],
        Component: ConfiancaFiscal,
    },
    {
        id: 'editorial',
        name: 'Editorial Multissetorial',
        hint: 'Revista de instituto cultural',
        swatches: ['#D7160E', '#951590', '#4717F6'],
        Component: EditorialMultissetorial,
    },
];

function directionFromHash() {
    const hash = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
    return DIRECTIONS.some((direction) => direction.id === hash) ? hash : DIRECTIONS[0].id;
}

export default function DesignSelector(props) {
    const [activeId, setActiveId] = useState(directionFromHash);
    const tabRefs = useRef({});
    const active = DIRECTIONS.find((direction) => direction.id === activeId);

    useEffect(() => {
        const onHashChange = () => setActiveId(directionFromHash());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const select = (id, { focus = false } = {}) => {
        setActiveId(id);
        window.history.replaceState(null, '', `#${id}`);
        window.scrollTo({ top: 0 });
        if (focus) {
            tabRefs.current[id]?.focus();
        }
    };

    const onTabKeyDown = (event) => {
        const offset = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
        if (!offset) {
            return;
        }
        event.preventDefault();
        const index = DIRECTIONS.findIndex((direction) => direction.id === activeId);
        const next = DIRECTIONS[(index + offset + DIRECTIONS.length) % DIRECTIONS.length];
        select(next.id, { focus: true });
    };

    return (
        <>
            <Head title="Direção de arte" />

            <header className="ds-bar">
                <p className="ds-bar__title">
                    <strong>Deixe Doar</strong>
                    <span>Escolha a direção de arte do novo site</span>
                </p>
                <div className="ds-bar__tabs" role="tablist" aria-label="Direções de arte">
                    {DIRECTIONS.map((direction) => {
                        const isActive = direction.id === activeId;
                        return (
                            <button
                                key={direction.id}
                                ref={(node) => (tabRefs.current[direction.id] = node)}
                                type="button"
                                role="tab"
                                id={`tab-${direction.id}`}
                                aria-selected={isActive}
                                aria-controls="direction-panel"
                                tabIndex={isActive ? 0 : -1}
                                className="ds-tab"
                                onClick={() => select(direction.id)}
                                onKeyDown={onTabKeyDown}
                            >
                                <span className="ds-tab__swatches" aria-hidden="true">
                                    {direction.swatches.map((color) => (
                                        <span key={color} style={{ background: color }} />
                                    ))}
                                </span>
                                <span className="ds-tab__text">
                                    <span className="ds-tab__name">{direction.name}</span>
                                    <span className="ds-tab__hint">{direction.hint}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </header>

            <main
                key={active.id}
                id="direction-panel"
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
                className="ds-panel"
            >
                <active.Component {...props} />
            </main>
        </>
    );
}
