<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SourceReferenceResource;
use App\Models\SourceReference;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SourceReferenceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $sourceReferences = SourceReference::query()
            ->orderBy('institution')
            ->paginate(15);

        return SourceReferenceResource::collection($sourceReferences);
    }

    public function show(SourceReference $sourceReference): SourceReferenceResource
    {
        return new SourceReferenceResource($sourceReference);
    }
}
