<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportSubjectEntity extends Model
{
    protected $guarded = []; 

    public function reports() {
        return $this->belongsToMany(Report::class); 
    }
}
