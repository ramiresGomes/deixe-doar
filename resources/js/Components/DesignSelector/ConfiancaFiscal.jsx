import { Landmark, ReceiptText, Scale, ShieldCheck } from 'lucide-react';
import { Logo, SiteFooter } from './Brand';
import Simulator from './Simulator';
import SpecSheet from './SpecSheet';
import { integer, projectsByFront } from './shared';

const PALETTE = [
    { name: 'Marinho institucional', hex: '#15104A', use: 'Títulos, botão principal, rodapé' },
    { name: 'Índigo da marca', hex: '#2A198B', use: 'Links, foco e estados selecionados' },
    { name: 'Violeta de dado', hex: '#4717F6', use: 'Valores em destaque no demonstrativo' },
    { name: 'Vermelho selo', hex: '#D8170F', use: 'Ponto da marca e avisos importantes' },
    { name: 'Papel de relatório', hex: '#F5F6FA', use: 'Faixas de seção e tabelas' },
    { name: 'Linha', hex: '#DADCE8', use: 'Divisórias e bordas de tabela' },
];

const NAV = ['Como funciona', 'Projetos', 'Transparência', 'Para contadores'];

export default function ConfiancaFiscal({ impact, irpf, projects, site }) {
    const fronts = projectsByFront(projects);
    const seals = [
        {
            Icon: ShieldCheck,
            title: `CNPJ ${site.institution.cnpj}`,
            text: `${site.institution.name}, desde ${site.institution.founded_year}`,
        },
        {
            Icon: ReceiptText,
            title: 'Recibo legal da doação',
            text: 'Para lançar na declaração completa do IRPF',
        },
        {
            Icon: Landmark,
            title: `${impact.approved_projects} projetos aprovados`,
            text: impact.incentive_laws.join(', '),
        },
        {
            Icon: Scale,
            title: 'Dedução prevista em lei',
            text: `Até ${irpf.donation_limit_percent}% do imposto devido`,
        },
    ];
    const steps = [
        { when: 'Hoje', what: 'Você simula e autoriza a doação. Uma análise de crédito simples confirma.' },
        {
            when: `Até 31/12/${irpf.calendar_year}`,
            what: 'O instituto faz a doação em seu nome e emite o recibo legal.',
        },
        {
            when: `Declaração de ${irpf.filing_year}`,
            what: 'Você lança a doação na declaração completa e o imposto cai.',
        },
        {
            when: 'Depois da restituição',
            what: 'Você reembolsa o instituto pelo valor exato, sem juros e sem taxas.',
        },
    ];
    const report = [
        { label: 'Cidades atendidas', value: `+${impact.cities}` },
        { label: 'Beneficiários diretos', value: `+${integer(impact.beneficiaries)}` },
        { label: 'Eventos realizados', value: `+${integer(impact.events)}` },
        { label: 'Projetos aprovados', value: impact.approved_projects },
        { label: 'Leis de incentivo', value: impact.incentive_laws_count },
        { label: 'Captados e aplicados', value: 'Quase R$ 10 mi' },
    ];

    return (
        <div className="w-fisc">
            <div className="fisc-utility">
                <div className="fisc-wrap fisc-utility__inner">
                    <span>
                        {site.institution.name}, CNPJ {site.institution.cnpj}
                    </span>
                    <a href={site.contact.whatsapp_url}>Atendimento {site.contact.whatsapp_display}</a>
                </div>
            </div>

            <header className="fisc-header">
                <div className="fisc-wrap fisc-header__inner">
                    <a href="#" className="fisc-brand">
                        <Logo size={46} />
                        <span>
                            <strong>Deixe Doar</strong>
                            <small>Incentivo fiscal com impacto social</small>
                        </span>
                    </a>
                    <nav aria-label="Principal" className="fisc-nav">
                        {NAV.map((item) => (
                            <a key={item} href="#">
                                {item}
                            </a>
                        ))}
                    </nav>
                    <a href="#fisc-sim" className="fisc-btn fisc-btn--small">
                        Simular
                    </a>
                </div>
            </header>

            <section className="fisc-hero">
                <div className="fisc-wrap grid grid-cols-1 gap-14 lg:grid-cols-[1fr_minmax(0,29rem)] lg:items-start">
                    <div>
                        <h1 className="fisc-h1">
                            Destine até {irpf.donation_limit_percent}% do seu Imposto de Renda com recibo legal e sem
                            tirar dinheiro do bolso hoje.
                        </h1>
                        <p className="fisc-lead">
                            Para quem faz a declaração completa: médicos, advogados, servidores, empresários e os
                            contadores que os orientam. A doação é dedutível, o valor volta na restituição e o
                            instituto pode financiá-la por você até 31 de dezembro.
                        </p>
                        <ul className="fisc-seals">
                            {seals.map(({ Icon, title, text }) => (
                                <li key={title}>
                                    <Icon aria-hidden="true" strokeWidth={1.75} />
                                    <span>
                                        <strong>{title}</strong>
                                        {text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="fisc-sim">
                        <Simulator
                            variant="fisc"
                            irpf={irpf}
                            whatsappUrl={site.contact.whatsapp_url}
                            title="Demonstrativo da sua doação"
                            detailed
                        />
                    </div>
                </div>
            </section>

            <section className="fisc-steps" aria-labelledby="fisc-steps-title">
                <div className="fisc-wrap">
                    <h2 id="fisc-steps-title" className="fisc-h2">
                        Como funciona a doação financiada
                    </h2>
                    <ol className="fisc-steps__list">
                        {steps.map((step, index) => (
                            <li key={step.when}>
                                <span className="fisc-steps__index" aria-hidden="true">
                                    {index + 1}
                                </span>
                                <p className="fisc-steps__when">{step.when}</p>
                                <p className="fisc-steps__what">{step.what}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="fisc-portfolio" aria-labelledby="fisc-portfolio-title">
                <div className="fisc-wrap grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                        <h2 id="fisc-portfolio-title" className="fisc-h2">
                            Para onde vai o seu imposto
                        </h2>
                        <div className="fisc-table-wrap">
                            <table className="fisc-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Projeto</th>
                                        <th scope="col">Frente</th>
                                        <th scope="col">Situação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fronts.map(({ name, project }) => (
                                        <tr key={project.slug}>
                                            <th scope="row">
                                                {project.title}
                                                <span>{project.summary}</span>
                                            </th>
                                            <td>{name}</td>
                                            <td>
                                                <span className={`fisc-status fisc-status--${project.status}`}>
                                                    {project.status_label}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h2 className="fisc-h2">Relatório de impacto</h2>
                        <dl className="fisc-report">
                            {report.map((item) => (
                                <div key={item.label}>
                                    <dt>{item.label}</dt>
                                    <dd>{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="fisc-report__note">
                            Dados acumulados desde {site.institution.founded_year}, com equipe de {impact.team_size}{' '}
                            profissionais.
                        </p>
                    </div>
                </div>
            </section>

            <SiteFooter variant="fisc" site={site} />

            <SpecSheet
                id="fisc"
                concept="A linguagem de um relatório anual de fundação somada à clareza de um app financeiro. O marinho e o índigo da logo carregam a autoridade; o violeta aparece só nos números que importam; o vermelho fica restrito ao ponto da marca. Serifa editorial nos títulos para dar peso de documento, sans pública e numerais tabulares em tudo que é valor."
                fonts={[
                    {
                        family: 'Newsreader',
                        role: 'Títulos com tamanho óptico, peso de documento',
                        sample: 'Recibo legal, dedução prevista em lei.',
                        sampleClassName: 'fisc-sample-display',
                    },
                    {
                        family: 'Public Sans',
                        role: 'Interface, tabelas e numerais tabulares',
                        sample: 'Imposto devido R$ 20.000, destinação R$ 1.200, desembolso hoje R$ 0, juros R$ 0.',
                        sampleClassName: 'fisc-sample-body',
                    },
                ]}
                palette={PALETTE}
                buttons={
                    <>
                        <button type="button" className="fisc-btn">
                            Quero que doem por mim
                        </button>
                        <button type="button" className="fisc-btn fisc-btn--outline">
                            Ver projetos aprovados
                        </button>
                        <button type="button" className="fisc-btn" disabled>
                            Enviando
                        </button>
                    </>
                }
                texture={{
                    className: 'fisc-texture',
                    text: 'Sem textura e sem sombra decorativa: divisórias de 1px, tabelas com numerais alinhados, selos com ícone de traço fino e um único card elevado, o demonstrativo. Raios pequenos (6px) para parecer documento, não aplicativo de varejo.',
                }}
            />
        </div>
    );
}
