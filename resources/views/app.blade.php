@php
    $meta = array_merge(config('seo.defaults'), $meta ?? []);
    $canonical = $meta['canonical'] ?? url()->current();
    $image = $meta['image'] ? url($meta['image']) : null;
@endphp
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $meta['title'] }}</title>
        <meta data-inertia="description" name="description" content="{{ $meta['description'] }}">
        <meta data-inertia="robots" name="robots" content="{{ $meta['robots'] }}">
        <link data-inertia="canonical" rel="canonical" href="{{ $canonical }}">

        <meta data-inertia="og:type" property="og:type" content="{{ $meta['type'] }}">
        <meta data-inertia="og:locale" property="og:locale" content="{{ $meta['locale'] }}">
        <meta data-inertia="og:site_name" property="og:site_name" content="{{ $meta['site_name'] }}">
        <meta data-inertia="og:title" property="og:title" content="{{ $meta['title'] }}">
        <meta data-inertia="og:description" property="og:description" content="{{ $meta['description'] }}">
        <meta data-inertia="og:url" property="og:url" content="{{ $canonical }}">
        <meta data-inertia="twitter:card" name="twitter:card" content="{{ $image ? 'summary_large_image' : 'summary' }}">
        @if ($image)
            <meta data-inertia="og:image" property="og:image" content="{{ $image }}">
            <meta data-inertia="twitter:image" name="twitter:image" content="{{ $image }}">
        @endif

        @if (! empty($fontStylesheets))
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            @foreach ($fontStylesheets as $href)
                <link rel="stylesheet" href="{{ $href }}">
            @endforeach
        @endif

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <x-inertia::head />
    </head>
    <body class="antialiased">
        <x-inertia::app />
    </body>
</html>
