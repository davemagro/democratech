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
        Schema::create('report_report_subject_entity', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('report_subject_entity_id')->constrained('report_subject_entities')->onDelete('cascade'); 
            $table->foreignId('report_id')->constrained('reports')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_report_subject_entity');
    }
};
