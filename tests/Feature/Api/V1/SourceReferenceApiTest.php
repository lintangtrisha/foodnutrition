<?php

namespace Tests\Feature\Api\V1;

use App\Models\SourceReference;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SourceReferenceApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_source_references_index_returns_successful_json_response(): void
    {
        $response = $this->getJson('/api/v1/source-references');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);
    }

    public function test_source_reference_detail_returns_not_found_for_unknown_uuid(): void
    {
        $response = $this->getJson(
            '/api/v1/source-references/00000000-0000-0000-0000-000000000000'
        );

        $response->assertNotFound();
    }

    public function test_source_reference_detail_returns_correct_data(): void
    {
        $source = SourceReference::create([
            'institution' => 'WHO',
            'title' => 'Healthy Diet',
            'url' => 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
            'section_page' => 'Healthy Diet',
            'version_date' => '2026-01-01',
        ]);

        $response = $this->getJson(
            '/api/v1/source-references/'.$source->id
        );

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $source->id)
            ->assertJsonPath('data.institution', 'WHO')
            ->assertJsonPath('data.title', 'Healthy Diet')
            ->assertJsonPath('data.section_page', 'Healthy Diet');
    }
}
