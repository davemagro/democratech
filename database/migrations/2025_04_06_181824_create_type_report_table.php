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
        Schema::create('report_report_type', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('report_type_id')->constrained('report_types')->onDelete('cascade'); 
            $table->foreignId('report_id')->constrained('reports')->onDelete('cascade');
            $table->unique(['report_type_id', 'report_id']);  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_report_type');
    }
};
