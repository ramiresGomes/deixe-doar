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
        Schema::create('simulation_leads', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('whatsapp', 20)->index();
            $table->string('city', 80)->nullable();
            $table->string('modality', 30)->index();
            $table->decimal('informed_income', 12, 2);
            $table->decimal('estimated_tax_due', 12, 2)->nullable();
            $table->decimal('donation_potential', 12, 2);
            $table->string('funnel_status', 20)->default('novo')->index();
            $table->text('notes')->nullable();
            $table->string('source', 80)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulation_leads');
    }
};
