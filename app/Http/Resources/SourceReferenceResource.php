<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SourceReferenceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'institution' => $this->institution,
            'title' => $this->title,
            'url' => $this->url,
            'section_page' => $this->section_page,
            'version_date' => $this->version_date?->toDateString(),
        ];
    }
}
