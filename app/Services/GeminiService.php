<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use JsonException;

class GeminiService
{
    public function analyze(UploadedFile $image): array
    {
        $apiKey = config('services.gemini.api_key');
        $model = config('services.gemini.model');

        if (blank($apiKey) || blank($model)) {
            throw new RuntimeException('Gemini configuration is incomplete.');
        }

        $prompt = <<<'PROMPT'
Analyze this food product nutrition label.

Extract only information that is clearly readable from the image.
Do not guess missing or unreadable values. Use null when a value
cannot be determined.

Return valid JSON only, using this structure:

{
  "product_name": "string or null",
  "serving_size": "string or null",
  "nutrition_facts": [
    {
      "name": "string",
      "amount": "string or null"
    }
  ],
  "ingredients": [
    {
      "name": "string",
      "category": "string or null",
      "description": "string or null"
    }
  ],
  "summary": "string",
  "notes": []
}

For ingredients, provide brief educational descriptions.
Do not make medical claims or label ingredients as harmful.
Do not invent information that is not visible on the label.
Write the output in English.
PROMPT;

        $imageData = base64_encode(
            file_get_contents($image->getRealPath())
        );

        $response = Http::timeout(60)
            ->withHeaders([
                'x-goog-api-key' => $apiKey,
            ])
            ->acceptJson()
            ->post(
                "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent",
                [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt],
                                [
                                    'inlineData' => [
                                        'mimeType' => $image->getMimeType(),
                                        'data' => $imageData,
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'generationConfig' => [
                        'responseMimeType' => 'application/json',
                        'temperature' => 0.2,
                    ],
                ]
            );

       if ($response->failed()) {
            Log::error('Gemini API returned an error.', [
                'status' => $response->status(),
                'response' => $response->json() ?? $response->body(),
            ]);

            throw new RuntimeException(
                'Gemini API request failed with status ' . $response->status()
            );
        }

        $generatedText = $response->json(
            'candidates.0.content.parts.0.text'
        );

        if (! is_string($generatedText) || blank($generatedText)) {
            throw new RuntimeException('Gemini returned an empty response.');
        }

        try {
            $result = json_decode(
                $generatedText,
                true,
                512,
                JSON_THROW_ON_ERROR
            );
        } catch (JsonException $exception) {
            throw new RuntimeException(
                'Gemini returned invalid JSON.',
                previous: $exception
            );
        }

        if (! is_array($result)) {
            throw new RuntimeException('Gemini returned an invalid data structure.');
        }

        return $result;
    }
}