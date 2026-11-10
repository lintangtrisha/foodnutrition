<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Insight extends Model
{
    use HasUuids;

    protected $fillable = [
        'term',
        'content',
        'source_id',
    ];

    public function sourceReference(): BelongsTo
    {
        return $this->belongsTo(
            SourceReference::class,
            'source_id'
        );
    }
}
