<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\InsightResource;
use App\Models\Insight;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InsightController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $query = Insight::query()
            ->with('sourceReference')
            ->orderBy('term');

        if (request()->filled('search')) {
            $search = mb_strtolower(request('search'));

            $query->whereRaw(
                'LOWER(term) LIKE ?',
                ['%'.$search.'%']
            );
        }

        $insights = $query->paginate(15)->withQueryString();

        return InsightResource::collection($insights);
    }

    public function show(Insight $insight): InsightResource
    {
        $insight->load('sourceReference');

        return new InsightResource($insight);
    }
}
