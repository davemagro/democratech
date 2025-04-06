<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportFile extends Model
{
    protected $guarded = []; 

    public function report() {
        return $this->belongsTo(Report::class); 
    }
}
