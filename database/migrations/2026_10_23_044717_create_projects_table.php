<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category', 80);
            $table->string('incentive_law')->nullable();
            $table->string('summary', 500);
            $table->text('description');
            $table->string('image_path')->nullable();
            $table->decimal('funding_goal', 12, 2)->nullable();
            $table->decimal('funding_raised', 12, 2)->default(0);
            $table->string('status', 20)->default('em_execucao')->index();
            $table->unsignedSmallInteger('started_year')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
