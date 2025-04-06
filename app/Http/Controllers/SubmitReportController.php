<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmitReportController extends Controller
{
    public function index() {
        return Inertia::render('SubmitReport'); 
    }

    public function save() {

        $report = request()->validate([
            'detail_body' => 'string', 
            'detail_images' => 'array', 
            'detail_images.*' => 'image', 
            'detail_files' => 'array', 
            'detail_files.*' => 'file', 
            'categories' => 'array', 
            'categories.*' => 'string', 
            'subject_entities' => 'array', 
            'subject_entities.*' => 'string', 
            'locations' => 'array', 
            'locations.*' => 'array'
        ]);

        return redirect()->route('home');
    }
}
