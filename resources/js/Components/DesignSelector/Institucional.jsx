import { Logo, PhotoSlot, SiteFooter } from './Brand';
import Simulator from './Simulator';
import SpecSheet from './SpecSheet';
import { integer, projectsByFront, testimonialBy, testimonialOrigin } from './shared';

const PALETTE = [
    { name: 'Violeta Deixe Doar', hex: '#4A1FE8', use: 'Ação principal, links, estado ativo' },
    { name: 'Índigo da marca', hex: '#221673', use: 'Títulos e texto forte' },
    { name: 'Vermelho órbita', hex: '#E5231B', use: 'Arco, pontos e marcadores gráficos' },
    { name: 'Vermelho texto', hex: '#C4150F', use: 'Vermelho quando vira texto (AA)' },
    { name: 'Névoa lilás', hex: '#F4F2FF', use: 'Faixas de seção e fundos de apoio' },
    { name: 'Noite', hex: '#100C33', use: 'Rodapé e blocos de contraste' },
];

const NAV = ['Como funciona', 'Frentes de atuação', 'Transparência', 'Contato'];

function OrbitArc() {
    return (
        <svg className="inst-orbit" viewBox="0 0 400 400" aria-hidden="true">
            <path d="M 52 128 A 170 170 0 1 0 346 272" />
            <circle cx="52" cy="128" r="11" />
            <circle cx="346" cy="272" r="11" />
        </svg>
    );
}

export default function Institucional({ impact, irpf, projects, testimonials, site }) {
    const fronts = projectsByFront(projects);
    const quote = testimonialBy(testimonials, 'Elisandra B. Faria');

    return (
        <div className="w-inst">
            <header className="inst-header">
                <div className="inst-wrap inst-header__inner">
                    <a href="#" className="inst-brand">
                        <Logo size={52} />
                        <span>
                            <strong>Deixe Doar</strong>
                            <small>Instituto Saúde e Equilíbrio</small>
                        </span>
                    </a>
                    <nav aria-label="Principal" className="inst-nav">
                        {NAV.map((item) => (
                            <a key={item} href="#">
                                {item}
                            </a>
                        ))}
                    </nav>
                    <a href="#inst-sim" className="inst-btn inst-btn--small">
                        Simular doação
                    </a>
                </div>
            </header>

            <section className="inst-hero">
                <div className="inst-wrap grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <h1 className="inst-h1">
                            Seu Imposto de Renda pode virar cultura, esporte, educação e inclusão em Minas Gerais.
                        </h1>
                        <p className="inst-lead">
                            Na declaração completa, até {irpf.donation_limit_percent}% do imposto devido pode ir para
                            projetos aprovados em leis de incentivo. O valor volta para você na restituição, e o
                            instituto pode até adiantar a doação sem juros.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <a href="#inst-sim" className="inst-btn">
                                Simular minha doação
                            </a>
                            <a href={site.contact.whatsapp_url} className="inst-btn inst-btn--ghost">
                                Falar no WhatsApp
                            </a>
                        </div>
                        <p className="inst-trust">
                            {impact.approved_projects} projetos aprovados em {impact.incentive_laws_count} leis de
                            incentivo. CNPJ {site.institution.cnpj}.
                        </p>
                    </div>
                    <div id="inst-sim" className="inst-sim-wrap">
                        <OrbitArc />
                        <Simulator variant="inst" irpf={irpf} whatsappUrl={site.contact.whatsapp_url} />
                    </div>
                </div>
            </section>

            <section className="inst-fronts" aria-labelledby="inst-fronts-title">
                <div className="inst-wrap">
                    <div className="inst-section-head">
                        <h2 id="inst-fronts-title" className="inst-h2">
                            Seis frentes, o mesmo rigor
                        </h2>
                        <p>
                            Cada real destinado vai para um projeto com aprovação em lei de incentivo, prestação de
                            contas e equipe própria de {impact.team_size} profissionais.
                        </p>
                    </div>
                    <ul className="inst-fronts__grid">
                        {fronts.map(({ name, project }) => (
                            <li key={project.slug} className="inst-front">
                                <PhotoSlot label={project.title} className="inst-front__photo" />
                                <p className="inst-front__tag">{name}</p>
                                <h3 className="inst-front__title">{project.title}</h3>
                                <p className="inst-front__summary">{project.summary}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="inst-impact" aria-labelledby="inst-impact-title">
                <div className="inst-wrap grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
                    <div>
                        <h2 id="inst-impact-title" className="inst-h2">
                            Vinte anos de trabalho medido
                        </h2>
                        <dl className="inst-impact__list">
                            <div>
                                <dt>Cidades atendidas</dt>
                                <dd>+{impact.cities}</dd>
                            </div>
                            <div>
                                <dt>Beneficiários diretos</dt>
                                <dd>+{integer(impact.beneficiaries)}</dd>
                            </div>
                            <div>
                                <dt>Eventos realizados</dt>
                                <dd>+{integer(impact.events)}</dd>
                            </div>
                            <div>
                                <dt>Captados e aplicados</dt>
                                <dd>Quase R$ 10 mi</dd>
                            </div>
                        </dl>
                    </div>
                    {quote && (
                        <figure className="inst-quote">
                            <blockquote>{quote.quote}</blockquote>
                            <figcaption>
                                <strong>{quote.author}</strong>
                                {testimonialOrigin(quote)}
                            </figcaption>
                        </figure>
                    )}
                </div>
            </section>

            <SiteFooter variant="inst" site={site} />

            <SpecSheet
                id="inst"
                concept="A logo continua sendo o centro: o violeta do anel vira a cor de ação, o índigo do lettering vira a cor do texto, e o arco vermelho com os dois pontos vira o único gesto gráfico do site, usado com parcimônia ao redor do simulador. Fundo claro e luminoso, tipografia geométrica de alta legibilidade e as seis frentes com o mesmo peso visual."
                fonts={[
                    {
                        family: 'Plus Jakarta Sans',
                        role: 'Títulos (ExtraBold, tracking levemente fechado)',
                        sample: 'Imposto que vira impacto em Minas',
                        sampleClassName: 'inst-sample-display',
                    },
                    {
                        family: 'Familjen Grotesk',
                        role: 'Texto, formulários e números',
                        sample: 'Doação dedutível até 6% do imposto devido, com recibo emitido pelo Instituto Saúde e Equilíbrio, CNPJ 15.550.277/0001-65.',
                        sampleClassName: 'inst-sample-body',
                    },
                ]}
                palette={PALETTE}
                buttons={
                    <>
                        <button type="button" className="inst-btn">
                            Simular minha doação
                        </button>
                        <button type="button" className="inst-btn inst-btn--ghost">
                            Ver projetos
                        </button>
                        <button type="button" className="inst-btn" disabled>
                            Enviando
                        </button>
                    </>
                }
                texture={{
                    className: 'inst-texture',
                    text: 'Superfícies lisas, sem textura. O arco vermelho de 270° com pontos nas pontas, tirado da logo, aparece uma vez por página. Raios de 14px nos painéis e 999px nos botões, que repetem a forma circular do selo.',
                }}
            />
        </div>
    );
}
