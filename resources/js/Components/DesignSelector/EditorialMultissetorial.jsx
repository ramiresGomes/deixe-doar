import { Logo, PhotoSlot, SiteFooter } from './Brand';
import Simulator from './Simulator';
import SpecSheet from './SpecSheet';
import { integer, projectsByFront, testimonialBy, testimonialOrigin } from './shared';

/** Six stops sampled along the logo's own red-to-violet-to-indigo sweep, one per front. */
const AXIS_COLORS = {
    'Financiamento de Doações': '#22166F',
    Cultura: '#D7160E',
    Educação: '#6A17D6',
    'Lazer e Sustentabilidade': '#4717F6',
    Esporte: '#C2124E',
    Inclusão: '#951590',
};

const PALETTE = [
    { name: 'Tinta', hex: '#120E33', use: 'Texto, títulos e rodapé' },
    { name: 'Papel', hex: '#FFFFFF', use: 'Fundo de leitura' },
    { name: 'Cultura', hex: AXIS_COLORS.Cultura, use: 'Vermelho da órbita' },
    { name: 'Esporte', hex: AXIS_COLORS.Esporte, use: 'Entre vermelho e violeta' },
    { name: 'Inclusão', hex: AXIS_COLORS.Inclusão, use: 'Ponto médio do degradê' },
    { name: 'Educação', hex: AXIS_COLORS.Educação, use: 'Violeta aquecido' },
    { name: 'Parques', hex: AXIS_COLORS['Lazer e Sustentabilidade'], use: 'Violeta do anel' },
    { name: 'Financiamento fiscal', hex: AXIS_COLORS['Financiamento de Doações'], use: 'Índigo do lettering' },
];

const axisStyle = (category) => ({ '--axis': AXIS_COLORS[category] });

export default function EditorialMultissetorial({ impact, irpf, projects, testimonials, site }) {
    const fronts = projectsByFront(projects);
    const quote = testimonialBy(testimonials, 'Joyce Magnini');

    return (
        <div className="w-edit">
            <header className="edit-masthead">
                <div className="edit-wrap edit-masthead__inner">
                    <a href="#" className="edit-brand">
                        <Logo size={60} />
                        <span>
                            <strong>Deixe Doar</strong>
                            <small>Instituto Saúde e Equilíbrio</small>
                        </span>
                    </a>
                    <div className="edit-masthead__actions">
                        <a href="#">Transparência</a>
                        <a href="#">Sobre o instituto</a>
                        <a href="#edit-sim" className="edit-btn edit-btn--small">
                            Simular doação
                        </a>
                    </div>
                </div>
                <nav aria-label="Frentes de atuação" className="edit-spectrum">
                    <ul className="edit-wrap">
                        {fronts.map(({ name, category }) => (
                            <li key={category} style={axisStyle(category)}>
                                <a href="#edit-index">{name}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <section className="edit-cover">
                <div className="edit-wrap grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                    <figure className="order-last lg:order-none lg:col-span-7">
                        <PhotoSlot label="Saúde & Equilíbrio nas Escolas" className="edit-cover__photo" />
                        <figcaption className="edit-caption">
                            Saúde &amp; Equilíbrio nas Escolas: cerca de {integer(impact.students_per_year)} alunos por
                            ano em apresentações de arte, esporte e educação em saúde.
                        </figcaption>
                    </figure>
                    <div className="lg:col-span-5">
                        <h1 className="edit-h1">Imposto que vira cultura, esporte, parque e inclusão.</h1>
                        <p className="edit-lead">
                            Há {new Date().getFullYear() - site.institution.founded_year} anos o Instituto Saúde e
                            Equilíbrio transforma incentivo fiscal em programação pública em {impact.cities} cidades
                            de Minas. Até {irpf.donation_limit_percent}% do seu IR pode entrar nessa conta.
                        </p>
                        <div id="edit-sim" className="mt-8">
                            <Simulator variant="edit" irpf={irpf} whatsappUrl={site.contact.whatsapp_url} />
                        </div>
                    </div>
                </div>
            </section>

            <section id="edit-index" className="edit-index" aria-labelledby="edit-index-title">
                <div className="edit-wrap">
                    <h2 id="edit-index-title" className="edit-h2">
                        Frentes de atuação
                    </h2>
                    <ul className="edit-index__list">
                        {fronts.map(({ name, category, project }) => (
                            <li key={project.slug} className="edit-entry" style={axisStyle(category)}>
                                <p className="edit-tag">{name}</p>
                                <div className="edit-entry__text">
                                    <h3 className="edit-entry__title">{project.title}</h3>
                                    <p className="edit-entry__summary">{project.summary}</p>
                                    <p className="edit-entry__meta">
                                        {project.status_label}
                                        {project.started_year && `, desde ${project.started_year}`}
                                    </p>
                                </div>
                                <PhotoSlot label={project.title} className="edit-entry__photo" />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {quote && (
                <section className="edit-quote-band" aria-label="Depoimento">
                    <figure className="edit-wrap edit-quote">
                        <blockquote>{quote.quote}</blockquote>
                        <figcaption>
                            <strong>{quote.author}</strong>
                            {testimonialOrigin(quote)}
                        </figcaption>
                    </figure>
                </section>
            )}

            <SiteFooter variant="edit" site={site} />

            <SpecSheet
                id="edit"
                concept="Uma plataforma de instituto cultural: grid de revista, fotografia grande, tipografia condensada com presença e uma régua de cores que organiza o conteúdo. As seis cores de eixo não foram inventadas, são seis paradas do próprio degradê da logo (vermelho da órbita, violeta do anel, índigo das letras). Assim a pluralidade aparece sem quebrar a marca."
                fonts={[
                    {
                        family: 'Bricolage Grotesque',
                        role: 'Títulos condensados (eixo de largura 75, tamanho óptico 96)',
                        sample: 'Cultura, esporte, parques e inclusão',
                        sampleClassName: 'edit-sample-display',
                    },
                    {
                        family: 'Atkinson Hyperlegible',
                        role: 'Texto corrido, desenhada para leitores com baixa visão',
                        sample: 'Uma escolha coerente para um instituto que faz dança em cadeira de rodas e oficinas para pessoas autistas: legibilidade como parte da inclusão.',
                        sampleClassName: 'edit-sample-body',
                    },
                ]}
                palette={PALETTE}
                buttons={
                    <>
                        <button type="button" className="edit-btn">
                            Simular doação
                        </button>
                        <button type="button" className="edit-btn edit-btn--outline">
                            Ler sobre o projeto
                        </button>
                        <button type="button" className="edit-btn" disabled>
                            Enviando
                        </button>
                    </>
                }
                texture={{
                    className: 'edit-texture',
                    text: 'Grid de 12 colunas com fotos sangradas, réguas de 1px entre matérias, a régua de seis cores no cabeçalho como índice das frentes e etiquetas de eixo em caixa normal. Cantos retos nas fotos e raio pequeno só em botões e etiquetas.',
                }}
            />
        </div>
    );
}
