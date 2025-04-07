<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Report;
use App\Models\Review; 

class ReportReviewController extends Controller
{
    public function index($id)
    {
        $report = Report::findOrFail($id);
        return Inertia::render('ReportReview', [
            'report' => $report
        ]);
    }

    public function save(Request $request, $id)
    {
        $report = Report::findOrFail($id);
        
        $reviewData = request()->validate([
            'rating' => 'required|string', 
            'reasoning' => 'nullable|array',
            'reasoning.*' => 'nullable|integer',
            'reasoning_other' => 'nullable|string',
        ]); 
        
        $review = new Review(); 
        $review->rating = $reviewData['rating']; 
        $review->reasoning = $reviewData['reasoning']; 
        $review->reasoning_other = $reviewData['reasoning_other']; 
        $review->report_id = $report->id; 
        $review->user_id = auth()->user()->id; 
        $review->save(); 
        
        return redirect()->route('home');
    }
}
