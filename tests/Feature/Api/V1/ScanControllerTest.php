<?php

namespace Tests\Feature\Api\V1;

use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ScanControllerTest extends TestCase
{
    public function test_it_accepts_a_valid_nutrition_label_image(): void
    {
        $response = $this->postJson('/api/v1/scans/analyze', [
            'product_name' => 'Chocolate Milk',
            'image' => UploadedFile::fake()->image('label.png'),
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('status', 'pending')
            ->assertJsonPath('data.product_name', 'Chocolate Milk')
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'product_name',
                    'image' => [
                        'mime_type',
                        'size',
                    ],
                ],
            ]);
    }

    public function test_it_requires_a_product_name(): void
    {
        $response = $this->postJson('/api/v1/scans/analyze', [
            'image' => UploadedFile::fake()->image('label.png'),
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['product_name']);
    }

    public function test_it_rejects_non_image_files(): void
    {
        $response = $this->postJson('/api/v1/scans/analyze', [
            'product_name' => 'Chocolate Milk',
            'image' => UploadedFile::fake()->create(
                'document.pdf',
                100,
                'application/pdf'
            ),
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['image']);
    }
}