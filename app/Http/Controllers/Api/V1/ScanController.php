<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\GeminiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class ScanController extends Controller
{
    public function __construct(
        private GeminiService $gemini
    ) {}

    public function analyze(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => ['required', 'string', 'max:255'],
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png', 'max:5120'],
        ]);

        try {
            $result = $this->gemini->analyze($validated['image']);

            // Use the submitted product name if Gemini cannot read it.
            $result['product_name'] = $result['product_name']
                ?? $validated['product_name'];

            return response()->json([
                'status' => 'success',
                'message' => 'Nutrition label analyzed successfully.',
                'data' => $result,
            ]);
        } catch (Throwable $exception) {
            Log::error('Gemini nutrition label analysis failed.', [
                'exception' => $exception,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Unable to analyze the nutrition label. Please try again.',
            ], 502);
        }
    }
}