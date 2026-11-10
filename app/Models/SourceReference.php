<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SourceReference extends Model
{
    use HasUuids;

    protected $fillable = [
        'institution',
        'title',
        'url',
        'section_page',
        'version_date',
    ];

    public function insights(): HasMany
    {
        return $this->hasMany(Insight::class, 'source_id');
    }

    protected function casts(): array
    {
        return [
            'version_date' => 'date',
        ];
    }
}
