import { useId } from 'react';
import { brl, MODALITIES, useDonationSimulation } from './shared';

export default function Simulator({ variant, irpf, whatsappUrl, title = 'Simule sua doação', detailed = false }) {
    const id = useId();
    const simulation = useDonationSimulation(irpf.donation_limit_percent);
    const nextYear = irpf.filing_year;

    return (
        <section className={`sim sim--${variant}`} aria-labelledby={`${id}-title`}>
            <h2 id={`${id}-title`} className="sim__title">
                {title}
            </h2>

            <fieldset className="sim__modes">
                <legend className="sr-only">Modalidade de doação</legend>
                {Object.values(MODALITIES).map((modality) => (
                    <label key={modality.id} className="sim__mode">
                        <input
                            type="radio"
                            name={`${id}-modality`}
                            value={modality.id}
                            checked={simulation.modality === modality.id}
                            onChange={() => simulation.setModality(modality.id)}
                        />
                        <span className="sim__mode-name">{modality.name}</span>
                        <span className="sim__mode-short">{modality.short}</span>
                    </label>
                ))}
            </fieldset>

            <div className="sim__field">
                <label htmlFor={`${id}-tax`}>Seu imposto devido no ano</label>
                <output htmlFor={`${id}-tax`}>{brl(simulation.taxDue)}</output>
            </div>
            <input id={`${id}-tax`} className="sim__range" {...simulation.rangeProps} />

            <dl className="sim__results">
                <div className="sim__row sim__row--main">
                    <dt>Vai para os projetos ({irpf.donation_limit_percent}%)</dt>
                    <dd>{brl(simulation.donation)}</dd>
                </div>
                <div className="sim__row">
                    <dt>{simulation.isFinanced ? 'Você paga hoje' : 'Você paga até 31/12'}</dt>
                    <dd>{brl(simulation.paidNow)}</dd>
                </div>
                <div className="sim__row">
                    <dt>
                        {simulation.isFinanced
                            ? `Você reembolsa em ${nextYear}, após a restituição`
                            : `Volta para você na restituição de ${nextYear}`}
                    </dt>
                    <dd>{brl(simulation.returnedNextYear)}</dd>
                </div>
                {detailed && (
                    <div className="sim__row">
                        <dt>Juros e taxas</dt>
                        <dd>{brl(0)}</dd>
                    </div>
                )}
            </dl>

            <a className="sim__cta" href={whatsappUrl}>
                {simulation.isFinanced ? 'Quero que doem por mim' : 'Quero doar agora'}
            </a>

            <p className="sim__note">
                Exemplo para quem faz a declaração completa do IRPF.
                {simulation.isFinanced && ' A modalidade Deixe Doar passa por uma análise de crédito simples.'}
            </p>
        </section>
    );
}
