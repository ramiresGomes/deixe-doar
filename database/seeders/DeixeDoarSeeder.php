<?php

namespace Database\Seeders;

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class DeixeDoarSeeder extends Seeder
{
    /**
     * Seed the real campaign data of deixedoar.com.br. Idempotent: safe to run repeatedly.
     */
    public function run(): void
    {
        $this->seedSettings();
        $this->seedProjects();
        $this->seedTeam();
        $this->seedTestimonials();
    }

    private function seedSettings(): void
    {
        foreach ($this->settings() as $key => [$label, $value]) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['group' => strstr($key, '.', true), 'label' => $label, 'value' => $value],
            );
        }

        Cache::forget(SiteSetting::CACHE_KEY);
    }

    /**
     * @return array<string, array{0: string, 1: mixed}>
     */
    private function settings(): array
    {
        return [
            'institution.name' => ['Razão social', 'Instituto Saúde e Equilíbrio'],
            'institution.cnpj' => ['CNPJ', '15.550.277/0001-65'],
            'institution.founded_year' => ['Ano de fundação', 2006],
            'institution.founder' => ['Fundador', 'Clóvison Alves (Clovim)'],
            'institution.headquarters' => ['Sede', 'Patrocínio/MG'],
            'institution.main_cities' => ['Cidades de atuação principal', ['Patrocínio', 'Uberlândia', 'Patos de Minas', 'Uberaba']],
            'institution.partner_name' => ['Organização parceira', 'Parque Olímpico BMX'],
            'institution.partner_cnpj' => ['CNPJ da organização parceira', '16.930.439/0001-53'],

            'contact.whatsapp_display' => ['WhatsApp (exibição)', '(34) 99991-7669'],
            'contact.whatsapp_number' => ['WhatsApp (E.164)', '5534999917669'],
            'contact.whatsapp_url' => ['Link do WhatsApp', 'https://wa.me/5534999917669'],
            'contact.whatsapp_owner' => ['Responsável pelo WhatsApp', 'Clovim'],
            'contact.email' => ['E-mail', 'clovison-clovin@hotmail.com'],

            'impact.cities' => ['Cidades atendidas', 71],
            'impact.beneficiaries' => ['Beneficiários diretos', 800000],
            'impact.events' => ['Eventos realizados', 5170],
            'impact.approved_projects' => ['Projetos aprovados', 33],
            'impact.incentive_laws_count' => ['Leis de incentivo', 5],
            'impact.incentive_laws' => ['Leis de incentivo citadas', ['Lei Rouanet', 'Lei de Incentivo ao Esporte', 'FIA/CMDCA', 'ICMS-MG']],
            'impact.amount_raised' => ['Valor captado e aplicado (aprox.)', 10000000],
            'impact.amount_raised_label' => ['Valor captado (texto)', 'Quase R$ 10 milhões captados e aplicados'],
            'impact.team_size' => ['Talentos Humanos na equipe', 30],
            'impact.students_per_year' => ['Alunos por ano (Escolas)', 30000],

            'content.campaign_name' => ['Nome da campanha', 'Deixe Doar'],
            'content.hero_title' => ['Título principal', 'Até 6% do seu Imposto de Renda pode virar circo, esporte e educação nas escolas de Minas.'],
            'content.hero_subtitle' => ['Subtítulo principal', 'Na declaração completa do IRPF, você destina parte do imposto devido a projetos aprovados em leis de incentivo e recebe o valor de volta na restituição ou no abatimento do imposto a pagar.'],
            'content.modality_financed_title' => ['Modalidade financiada (título)', 'Deixe Doar: doem por mim'],
            'content.modality_financed_text' => ['Modalidade financiada (texto)', 'Você simula quanto pode destinar, autoriza a campanha e o instituto financia a doação em seu nome até 31 de dezembro, sem custo, sem juros e sem desembolso hoje (sujeito a análise de crédito simples). Você recebe o recibo legal, lança na declaração do IRPF e só reembolsa o instituto no ano seguinte, depois de receber sua restituição maior ou pagar menos imposto.'],
            'content.modality_traditional_title' => ['Modalidade tradicional (título)', 'Quero doar agora'],
            'content.modality_traditional_text' => ['Modalidade tradicional (texto)', 'Você faz a doação até 31 de dezembro e recebe 100% do valor de volta no ano seguinte, na restituição ou no abatimento do IRPF.'],

            'irpf.calendar_year' => ['Ano-calendário de referência', 2026],
            'irpf.filing_year' => ['Exercício (ano da declaração)', 2027],
            'irpf.donation_limit_percent' => ['Limite de dedução de doações (% do imposto devido)', 6],
            'irpf.donation_deadline' => ['Prazo da doação no ano-calendário', '31/12'],
            'irpf.requires_full_declaration' => ['Exige declaração completa', true],
            'irpf.dependent_deduction_annual' => ['Dedução anual por dependente (R$)', 2275.08],
            'irpf.education_cap_annual' => ['Teto anual de despesas com educação por pessoa (R$)', 3561.50],
            'irpf.annual_brackets' => ['Tabela progressiva anual', [
                ['up_to' => 29145.60, 'rate' => 0, 'deduction' => 0],
                ['up_to' => 33919.80, 'rate' => 7.5, 'deduction' => 2185.92],
                ['up_to' => 45012.60, 'rate' => 15, 'deduction' => 4729.92],
                ['up_to' => 55976.16, 'rate' => 22.5, 'deduction' => 8105.88],
                ['up_to' => null, 'rate' => 27.5, 'deduction' => 10904.76],
            ]],
            'irpf.annual_reduction' => ['Redução anual do imposto (Lei 15.270/2025)', [
                'full_up_to' => 60000.00,
                'full_max_reduction' => 2694.15,
                'partial_up_to' => 88200.00,
                'partial_constant' => 8429.73,
                'partial_factor' => 0.095575,
            ]],
            'irpf.source_note' => ['Fonte dos parâmetros', 'Tabela mensal vigente desde maio/2025 (anualizada) e redução da Lei 15.270/2025. Revisar a cada ano com a Receita Federal.'],
        ];
    }

    private function seedProjects(): void
    {
        $projects = [
            [
                'title' => 'Deixe Doar: Financiamento de Doações',
                'slug' => 'deixe-doar-financiamento-de-doacoes',
                'category' => 'Financiamento de Doações',
                'summary' => 'O instituto financia sua doação incentivada até 31 de dezembro, sem custo e sem juros. Você só reembolsa no ano seguinte, depois da restituição do IRPF.',
                'description' => "Na modalidade Deixe Doar (doem por mim), o contribuinte simula quanto pode destinar, até 6% do IRPF devido na declaração completa, e autoriza a campanha. O Instituto Saúde e Equilíbrio financia a doação em nome dele até 31 de dezembro, sem custo, sem juros e sem desembolso hoje, sujeito a uma análise de crédito simples.\n\nO doador recebe o recibo legal, lança a doação na declaração do IRPF e só reembolsa o instituto no ano seguinte, depois de receber uma restituição maior ou de pagar menos imposto.",
                'status' => ProjectStatus::EmCaptacao,
                'started_year' => null,
            ],
            [
                'title' => 'Trupe Saúde & Equilíbrio',
                'slug' => 'trupe-saude-e-equilibrio',
                'category' => 'Cultura',
                'summary' => 'Circo itinerante que visita escolas desde 2014, com Clovim e a Palhaça Berbela.',
                'description' => 'A Trupe Saúde & Equilíbrio é o circo itinerante do instituto. Desde 2014 leva espetáculos às escolas com Clovim e a Palhaça Berbela, unindo palhaçaria, acrobacia e malabarismo a mensagens de saúde e equilíbrio.',
                'status' => ProjectStatus::EmExecucao,
                'started_year' => 2014,
            ],
            [
                'title' => 'Com o Clovim: Saúde & Equilíbrio nas Escolas',
                'slug' => 'com-o-clovim-saude-e-equilibrio-nas-escolas',
                'category' => 'Educação',
                'summary' => 'Cerca de 30.000 alunos por ano, em mais de 5.000 eventos realizados nas escolas.',
                'description' => 'O projeto de educação do instituto leva Clovim e a equipe às escolas com apresentações que unem arte, esporte e educação em saúde. Atende cerca de 30.000 alunos por ano e soma mais de 5.000 eventos realizados.',
                'status' => ProjectStatus::EmExecucao,
                'started_year' => null,
            ],
            [
                'title' => 'Udi Bike Parques',
                'slug' => 'udi-bike-parques',
                'category' => 'Lazer e Sustentabilidade',
                'summary' => 'Bicicletas compartilhadas gratuitas e oficinas no Parque do Sabiá, em Uberlândia.',
                'description' => 'O Udi Bike Parques oferece bicicletas compartilhadas gratuitas e oficinas no Parque do Sabiá, em Uberlândia, incentivando lazer ao ar livre, atividade física e mobilidade sustentável.',
                'status' => ProjectStatus::EmExecucao,
                'started_year' => null,
            ],
            [
                'title' => 'Esportes Olímpicos e Urbanos: BMX Freestyle e Breaking',
                'slug' => 'esportes-olimpicos-e-urbanos-bmx-freestyle-e-breaking',
                'category' => 'Esporte',
                'summary' => 'BMX Freestyle acrobático com o Parque Olímpico BMX e breaking olímpico com a B-Girl Mini-Japa, da Seleção Brasileira.',
                'description' => 'A frente de esportes olímpicos e urbanos reúne o BMX Freestyle acrobático, ligado ao Parque Olímpico BMX, e o breaking, modalidade olímpica representada pela B-Girl Mini-Japa, atleta da Seleção Brasileira de Break.',
                'status' => ProjectStatus::EmExecucao,
                'started_year' => null,
            ],
            [
                'title' => 'AnDança Inclusiva e Autistas',
                'slug' => 'andanca-inclusiva-e-autistas',
                'category' => 'Inclusão',
                'summary' => 'Dança em cadeira de rodas nas escolas desde 2012 e oficinas para pessoas autistas.',
                'description' => 'O AnDança Inclusiva leva a dança em cadeira de rodas às escolas desde 2012 e promove oficinas voltadas a pessoas autistas, usando o movimento como ferramenta de inclusão.',
                'status' => ProjectStatus::EmExecucao,
                'started_year' => 2012,
            ],
        ];

        foreach ($projects as $order => $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                [...$project, 'sort_order' => $order + 1],
            );
        }
    }

    private function seedTeam(): void
    {
        $members = [
            [
                'stage_name' => 'Clovim',
                'real_name' => 'Clóvison Alves',
                'specialty' => 'BMX Freestyle acrobático e gestão',
                'bio' => 'Fundador do Instituto Saúde e Equilíbrio em 2006. Atleta de BMX Freestyle acrobático e gestor dos projetos.',
            ],
            [
                'stage_name' => 'Palhaça Berbela',
                'real_name' => 'Priscila Gonçalves',
                'specialty' => 'Palhaçaria',
                'bio' => 'Palhaça da Trupe Saúde & Equilíbrio, ao lado do Clovim nas apresentações em escolas.',
            ],
            [
                'stage_name' => 'B-Girl Mini-Japa',
                'real_name' => null,
                'specialty' => 'Breaking',
                'bio' => 'Dançarina de breaking da Seleção Brasileira de Break.',
            ],
            [
                'stage_name' => 'Susan Kelli',
                'real_name' => null,
                'specialty' => 'Malabarismo e gestão cultural',
                'bio' => 'Malabarista e gestora cultural do instituto.',
            ],
            [
                'stage_name' => 'Alexander Coronel',
                'real_name' => null,
                'specialty' => 'Malabarismo',
                'bio' => 'Malabarista da equipe de apresentações.',
            ],
            [
                'stage_name' => 'Júnia Dornelas',
                'real_name' => null,
                'specialty' => 'Dança e comunicação',
                'bio' => 'Dançarina e influenciadora digital.',
            ],
        ];

        foreach ($members as $order => $member) {
            TeamMember::updateOrCreate(
                ['stage_name' => $member['stage_name']],
                [...$member, 'sort_order' => $order + 1],
            );
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            [
                'quote' => 'A equipe contagiou a todos que participaram do evento. Alegrou a nossa tarde, a nossa escola.',
                'author' => 'Francisca Natália Nunes',
                'role' => 'Diretora',
                'school' => 'E.E. Adelaide Maciel',
                'city' => 'Patos de Minas',
                'year' => 2022,
                'source' => null,
            ],
            [
                'quote' => 'Nosso apelo: da necessidade de estarem vindo para a escola projetos como esse, que tragam a arte, que tragam o esporte.',
                'author' => 'Elisandra B. Faria',
                'role' => 'Diretora',
                'school' => 'E.M. Orlanda Neves Strack',
                'city' => 'Uberlândia',
                'year' => 2017,
                'source' => 'TV Universitária Uberlândia',
            ],
            [
                'quote' => 'É preciso mais Clovinhos para tentar levar essa vida pra dentro das escolas.',
                'author' => 'Joyce Magnini',
                'role' => 'Então Superintendente Regional de Ensino de Uberlândia',
                'school' => null,
                'city' => 'Uberlândia',
                'year' => 2011,
                'source' => 'TV Paranaíba',
            ],
            [
                'quote' => 'As crianças amaram!!!',
                'author' => 'Aline Queiroz Silva',
                'role' => 'Diretora',
                'school' => 'E.M. João Beraldo',
                'city' => 'Patrocínio',
                'year' => 2022,
                'source' => null,
            ],
        ];

        foreach ($testimonials as $order => $testimonial) {
            Testimonial::updateOrCreate(
                ['author' => $testimonial['author']],
                [...$testimonial, 'sort_order' => $order + 1],
            );
        }
    }
}
