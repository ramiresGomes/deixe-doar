import { useState } from 'react';

export const LOGO_SRC = '/images/logo-deixe-doar.png';

const TAX_DUE_RANGE = { min: 1000, max: 50000, step: 500, initial: 20000 };

export const MODALITIES = {
    financiada: {
        id: 'financiada',
        name: 'Deixe Doar',
        short: 'O instituto financia por você',
    },
    tradicional: {
        id: 'tradicional',
        name: 'Quero doar agora',
        short: 'Você doa e recebe de volta',
    },
};

/** Display order and short names of the institute's fronts, keyed by project category. */
export const FRONTS = [
    { category: 'Financiamento de Doações', name: 'Financiamento fiscal' },
    { category: 'Cultura', name: 'Cultura' },
    { category: 'Educação', name: 'Educação' },
    { category: 'Lazer e Sustentabilidade', name: 'Parques' },
    { category: 'Esporte', name: 'Esporte' },
    { category: 'Inclusão', name: 'Inclusão' },
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat('pt-BR');

export const brl = (value) => currencyFormatter.format(value);

export const integer = (value) => integerFormatter.format(value);

export function useDonationSimulation(limitPercent = 6) {
    const [taxDue, setTaxDue] = useState(TAX_DUE_RANGE.initial);
    const [modality, setModality] = useState(MODALITIES.financiada.id);
    const donation = Math.round((taxDue * limitPercent) / 100);
    const isFinanced = modality === MODALITIES.financiada.id;

    return {
        taxDue,
        donation,
        modality,
        setModality,
        isFinanced,
        paidNow: isFinanced ? 0 : donation,
        returnedNextYear: donation,
        rangeProps: {
            type: 'range',
            min: TAX_DUE_RANGE.min,
            max: TAX_DUE_RANGE.max,
            step: TAX_DUE_RANGE.step,
            value: taxDue,
            onChange: (event) => setTaxDue(Number(event.target.value)),
            'aria-valuetext': brl(taxDue),
        },
    };
}

export function projectsByFront(projects) {
    return FRONTS.map((front) => ({
        ...front,
        project: projects.find((project) => project.category === front.category),
    })).filter((front) => front.project);
}

export function testimonialBy(testimonials, author) {
    return testimonials.find((testimonial) => testimonial.author === author);
}

export function testimonialOrigin({ role, school, city, year }) {
    return [role, school, `${city}, ${year}`].filter(Boolean).join(', ');
}
