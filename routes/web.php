<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])
    ->name('home');

Route::get('/about', function () {
    return 'Hello'; 
}); 

Route::get('/submit', [App\Http\Controllers\SubmitReportController::class, 'index'])
    ->name('submit');
Route::post('/submit', [\App\Http\Controllers\SubmitReportController::class, 'save'])
    ->name('submit.save'); 