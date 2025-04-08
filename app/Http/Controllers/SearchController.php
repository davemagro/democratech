<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class SearchController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        return Inertia::render('Search', ['search' => $search]);
    }
}
