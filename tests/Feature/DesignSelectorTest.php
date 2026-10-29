<?php

namespace Tests\Feature;

use Database\Seeders\DeixeDoarSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DesignSelectorTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_renders_the_design_selector_with_seeded_data(): void
    {
        $this->seed(DeixeDoarSeeder::class);

        $this->get(route('home'))
            ->assertOk()
            ->assertSee('<meta data-inertia="robots" name="robots" content="noindex,nofollow">', false)
            ->assertInertia(fn (Assert $page) => $page
                ->component('DesignSelector')
                ->has('projects', 6)
                ->has('testimonials', 4)
                ->where('irpf.donation_limit_percent', 6)
                ->where('site.contact.whatsapp_url', 'https://wa.me/5534999917669')
                ->where('projects.0.status', 'em_captacao')
            );
    }
}
