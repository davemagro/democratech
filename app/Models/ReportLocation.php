<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportLocation extends Model
{
    protected $guarded = []; 

    public function report() {
        $this->belongsTo(Report::class);
    }
}
