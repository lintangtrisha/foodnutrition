<?php

namespace Tests\Feature\Api\V1;

use App\Models\Insight;
use App\Models\SourceReference;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InsightApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_insights_can_be_searched_by_term(): void
    {
        $source = SourceReference::create([
            'institution' => 'WHO',
            'title' => 'Healthy Diet',
            'url' => 'https://www.who.int/',
            'section_page' => 'Healthy Diet',
            'version_date' => '2026-01-01',
        ]);

        Insight::create([
            'term' => 'Gula',
            'content' => 'Penjelasan tentang gula.',
            'source_id' => $source->id,
        ]);

        Insight::create([
            'term' => 'Natrium',
            'content' => 'Penjelasan tentang natrium.',
            'source_id' => $source->id,
        ]);

        $response = $this->getJson('/api/v1/insights?search=gula');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.term', 'Gula');
    }

    public function test_insights_index_returns_successful_json_response(): void
    {
        $response = $this->getJson('/api/v1/insights');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);
    }

    public function test_insight_detail_returns_json_response(): void
    {
        $response = $this->getJson(
            '/api/v1/insights/00000000-0000-0000-0000-000000000000'
        );

        $response->assertNotFound();
    }

    public function test_insight_index_includes_its_source_reference(): void
    {
        $source = SourceReference::create([
            'institution' => 'WHO',
            'title' => 'Healthy Diet',
            'url' => 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
            'section_page' => 'Healthy Diet',
            'version_date' => '2026-01-01',
        ]);

        Insight::create([
            'term' => 'Gula',
            'content' => 'Gula merupakan jenis karbohidrat sederhana.',
            'source_id' => $source->id,
        ]);

        $response = $this->getJson('/api/v1/insights');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.term', 'Gula')
            ->assertJsonPath('data.0.source_reference.institution', 'WHO')
            ->assertJsonPath('data.0.source_reference.title', 'Healthy Diet');
    }

    public function test_insight_detail_includes_its_source_reference(): void
    {
        $source = SourceReference::create([
            'institution' => 'WHO',
            'title' => 'Healthy Diet',
            'url' => 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
            'section_page' => 'Healthy Diet',
            'version_date' => '2026-01-01',
        ]);

        $insight = Insight::create([
            'term' => 'Natrium',
            'content' => 'Natrium merupakan mineral yang terdapat dalam garam.',
            'source_id' => $source->id,
        ]);

        $response = $this->getJson(
            '/api/v1/insights/'.$insight->id
        );

        $response
            ->assertOk()
            ->assertJsonPath('data.term', 'Natrium')
            ->assertJsonPath('data.content', 'Natrium merupakan mineral yang terdapat dalam garam.')
            ->assertJsonPath('data.source_reference.institution', 'WHO')
            ->assertJsonPath('data.source_reference.title', 'Healthy Diet');
    }
}
