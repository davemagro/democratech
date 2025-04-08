<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report; 

class HomeController extends Controller
{
    public function index() {
        $reports = Report::with('images')->with('files')->get()->sortByDesc('created_at')->values()->all(); 
        return Inertia::render('Home', ['reports' => $reports]); 
    }
}
