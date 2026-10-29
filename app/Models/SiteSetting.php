<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

#[Fillable(['group', 'key', 'value', 'label'])]
class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    public const CACHE_KEY = 'site_settings.all';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'value' => 'json',
        ];
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget(self::CACHE_KEY));
        static::deleted(fn () => Cache::forget(self::CACHE_KEY));
    }

    /**
     * All settings keyed by their dotted key (e.g. "contact.whatsapp").
     *
     * @return array<string, mixed>
     */
    public static function allKeyed(): array
    {
        return Cache::rememberForever(
            self::CACHE_KEY,
            fn (): array => static::query()->pluck('value', 'key')->all(),
        );
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return static::allKeyed()[$key] ?? $default;
    }

    /**
     * Settings of a single group, keyed without the group prefix.
     *
     * @return array<string, mixed>
     */
    public static function group(string $group): array
    {
        $prefix = $group.'.';

        return collect(static::allKeyed())
            ->filter(fn (mixed $value, string $key): bool => str_starts_with($key, $prefix))
            ->mapWithKeys(fn (mixed $value, string $key): array => [substr($key, strlen($prefix)) => $value])
            ->all();
    }
}
