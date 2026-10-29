<?php

namespace Tests\Feature;

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\SimulationLead;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Database\Seeders\DeixeDoarSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeixeDoarSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_seeds_the_real_campaign_data(): void
    {
        $this->seed(DeixeDoarSeeder::class);

        $this->assertSame('(34) 99991-7669', SiteSetting::get('contact.whatsapp_display'));
        $this->assertSame('https://wa.me/5534999917669', SiteSetting::get('contact.whatsapp_url'));
        $this->assertSame('15.550.277/0001-65', SiteSetting::get('institution.cnpj'));
        $this->assertSame(6, SiteSetting::get('irpf.donation_limit_percent'));
        $this->assertSame(71, SiteSetting::get('impact.cities'));
        $this->assertCount(5, SiteSetting::get('irpf.annual_brackets'));

        $this->assertSame(6, Project::count());
        $this->assertSame(
            ProjectStatus::EmCaptacao,
            Project::where('slug', 'deixe-doar-financiamento-de-doacoes')->sole()->status,
        );

        $this->assertSame(6, TeamMember::count());
        $this->assertSame('Clóvison Alves', TeamMember::where('stage_name', 'Clovim')->sole()->real_name);

        $this->assertSame(4, Testimonial::count());
        $this->assertSame(0, SimulationLead::count());
    }

    public function test_it_is_idempotent(): void
    {
        $this->seed(DeixeDoarSeeder::class);
        $this->seed(DeixeDoarSeeder::class);

        $this->assertSame(6, Project::count());
        $this->assertSame(6, TeamMember::count());
        $this->assertSame(4, Testimonial::count());
    }

    public function test_settings_can_be_read_by_group(): void
    {
        $this->seed(DeixeDoarSeeder::class);

        $contact = SiteSetting::group('contact');

        $this->assertSame('clovison-clovin@hotmail.com', $contact['email']);
        $this->assertArrayNotHasKey('cnpj', $contact);
    }
}
