<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Temporary art-direction picker. Replace with the real home once a direction is chosen.
 */
class DesignSelectorController extends Controller
{
    private const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&family=Familjen+Grotesk:wght@400..700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..500&family=Public+Sans:wght@400..700&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap';

    public function __invoke(): Response
    {
        return Inertia::render('DesignSelector', [
            'impact' => SiteSetting::group('impact'),
            'content' => SiteSetting::group('content'),
            'irpf' => SiteSetting::group('irpf'),
            'projects' => Project::query()->ordered()->get()->map(fn (Project $project): array => [
                ...$project->only(['title', 'slug', 'category', 'incentive_law', 'summary', 'started_year', 'image_url']),
                'status' => $project->status->value,
                'status_label' => $project->status->label(),
            ]),
            'testimonials' => Testimonial::query()->ordered()->get(['quote', 'author', 'role', 'school', 'city', 'year']),
        ])->withViewData([
            'meta' => [
                'title' => 'Direção de arte | Deixe Doar',
                'robots' => 'noindex,nofollow',
            ],
            'fontStylesheets' => [self::FONTS_URL],
        ]);
    }
}
