<?php

use App\Http\Controllers\Api\V1\ScanController;
use App\Http\Controllers\Api\V1\InsightController;
use App\Http\Controllers\Api\V1\SourceReferenceController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('scans/analyze', [ScanController::class, 'analyze'])
        ->name('api.v1.scans.analyze');

    Route::get('insights', [InsightController::class, 'index'])
        ->name('api.v1.insights.index');

    Route::get('insights/{insight}', [InsightController::class, 'show'])
        ->name('api.v1.insights.show');

    Route::get('source-references', [SourceReferenceController::class, 'index'])
        ->name('api.v1.source-references.index');

    Route::get('source-references/{sourceReference}', [SourceReferenceController::class, 'show'])
        ->name('api.v1.source-references.show');
});
