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
        Schema::create('report_locations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('province', 64)->nullable(); 
            $table->string('municipality', 64)->nullable(); 
            $table->string('barangay', 64)->nullable();
            $table->foreignId('report_id')->constrained('reports')->onDelete('cascade'); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_locations');
    }
};
