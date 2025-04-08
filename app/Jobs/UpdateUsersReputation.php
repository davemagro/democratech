<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\User;
use Illuminate\Support\Facades\DB;

function userReputationScore(User $user) {

    // Post by a user who has tanked reputation must not even be shown in the 
  // first place.

  $score = 0; 

  // Reputation is based on posts and reviews 

  // SCORE BY REVIEWS  
  // As per reviews, we will consider it's eventual factuality and how early was it given 
  $userReviews = $user->reviews; 
  $maxScore = $userReviewsCount = $userReviews->count(); 
  if ($userReviewsCount > 0) { 
    $__score = 0; 
    foreach ($userReviews as $userReview) {
      echo "\nREVIEW: " . $userReview->report->community_score;  
      // $reviewPostActivitySpan = $userReview->post->reviews()->orderBy('created_at', 'asc')->last()->created_at 
      //  - $userReview->post->reviews()->orderBy('created_at', 'asc')->first()->created_at;

      // How near is the user's review to the community_score, 1 - nearest, 0 - farthest 
      $__score += (1 - abs($scorePerRating[$userReview->rating] - $userReview->report->community_score)) 
          * $userReview->report->community_score; 
      echo "\n+REVIEW SCORE: " . $__score;  
      // TODO: Add decay, so that new users can't just post a review on already well-established 
      //       posts to boost up their reputation   
    }

    echo "\nREVIEW SCORE: " . ($__score / $maxScore);  
    $score += ($__score / $maxScore) * 0.5; 
  } else {
    $score += 0.5; 
  }

  // SCORE BY POSTS 
  // As per posts, we will consider it's eventual factuality, basically how good the post is for the community 
  $scorePerRating = [
    'yes' => 1, 
    'hmmmm' => 0.5, 
    'no' => 0
  ]; 
  
  $userPosts = $user->reports(); 
  $maxScore = $userPostsCount = $userPosts->count();
  if ($userPostsCount > 0) { 
    $__score = 0; 
    foreach ($userPosts as $post) {
      foreach ($post->reviews as $postReview) { 
        $__score += $scorePerRating[$postReview->rating] * $postReview->user()->reputation_score; 
      }
    }

    echo "POST SCORE: " . ($__score / $maxScore);  
    $score += ($__score / $maxScore) * 0.5; 
  } else {
    $score += 0.5; 
  }

  echo "Real score: $score\n"; 

  // TODO: Default score is 1.0 ?? for those users who have no reviews or posts
  //       Let's avoid this by taking into consideration the time span of the user's activity 

  // TODO: Better implementation! 
  //        as of now, it just limits the reputation of new users according to the number of 
  //        reviews and posts they have. it doesn't take into consideration the quality of those 
  //        reviews and posts. so if they post more, they may get higher rep
  $userActivityLevel = (min(1, $userReviewsCount / 5) * 0.5) + (min(1, $userPostsCount / 3) * 0.5); 
  echo "userActivityLevel: $userActivityLevel\n"; 


  $score = $score * $userActivityLevel; 

  return $score;     

}

class UpdateUsersReputation implements ShouldQueue
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
        $users = User::all(); 

        DB::beginTransaction(); 
        foreach ($users as $user) {
            $user->reputation_score = userReputationScore($user); 
            $user->save(); 
        }
        DB::commit(); 
    }
}
