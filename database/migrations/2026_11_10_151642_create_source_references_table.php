
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('source_references', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('institution');
            $table->string('title');
            $table->text('url');
            $table->text('section_page');
            $table->date('version_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('source_references');
    }
};
