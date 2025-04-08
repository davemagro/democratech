<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Report;
use Illuminate\Support\Facades\DB;

function communityScore(Report $report) {
    $scorePerRating = [
        'yes' => 1, 
        'hmmmm' => 0.5, 
        'no' => 0
    ]; 

    $reportReviews = $report->reviews; 
    $maxScore = $reviewsCount = $report->reviews->count(); 

    echo $report->id . " Reviews count: $reviewsCount\n";

    // TODO: Should be enough for now 
    if ($reviewsCount <= 3) return $report->community_score;  


    $score = 0; 
    foreach ($reportReviews as $reportReview) {
      $score += $scorePerRating[$reportReview->rating] * ($reportReview->user->reputation_score / $maxScore); 
    }

    echo $report->id . " Real score: $score\n";

    $score = $score / $maxScore; 

    return $score;     
}

class UpdateCommunityScore implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $reports = Report::all(); 

        DB::beginTransaction(); 
        foreach ($reports as $report) {
            $report->community_score = communityScore($report);     
            $report->save(); 
        }
        DB::commit(); 
    }
}
