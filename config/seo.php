<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default SEO meta
    |--------------------------------------------------------------------------
    |
    | Rendered server-side by resources/views/app.blade.php (there is no SSR
    | process in production). Pages override any key by returning
    | ->withViewData(['meta' => [...]]) from the controller.
    |
    */

    'defaults' => [
        'title' => 'Deixe Doar | Instituto Saúde e Equilíbrio',
        'description' => 'Destine até 6% do seu Imposto de Renda a projetos de circo, esporte, educação e inclusão em Minas Gerais. O instituto pode financiar sua doação sem juros e você recebe tudo de volta na restituição.',
        'image' => null,
        'type' => 'website',
        'locale' => 'pt_BR',
        'site_name' => 'Deixe Doar',
        'robots' => 'index,follow',
    ],

];
