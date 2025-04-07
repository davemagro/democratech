<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])
    ->name('home');

Route::get('/sign-up', [AuthController::class, 'signup'])
    ->name('signup'); 
Route::post('/sign-up', [AuthController::class, 'signupSave'])
    ->name('signup.save');

Route::get('/sign-in', [AuthController::class, 'signin'])
    ->name('signin');
Route::post('/sign-in', [AuthController::class, 'signinSave'])
    ->name('signin.save'); 
 


Route::get('/about', function () {
    return 'Hello'; 
}); 

Route::get('/submit', [App\Http\Controllers\SubmitReportController::class, 'index'])
    ->name('submit')
    ->middleware('auth');
Route::post('/submit', [\App\Http\Controllers\SubmitReportController::class, 'save'])
    ->name('submit.save')
    ->middleware('auth');
    
    
Route::get('/review/{id}', [App\Http\Controllers\ReportReviewController::class, 'index'])
    ->name('review')
    ->middleware('auth');
Route::post('/review/{id}', [App\Http\Controllers\ReportReviewController::class, 'save'])
    ->name('review.save')
    ->middleware('auth');
