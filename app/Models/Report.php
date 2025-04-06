<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{

    protected $guarded = []; 

    public function images() {
        return $this->hasMany(ReportImage::class)->chaperone('report'); 
    }

    public function files() {
        return $this->hasMany(ReportFile::class)->chaperone("report"); 
    }
    
    public function locations() {
        return $this->hasMany(ReportLocation::class)->chaperone("report"); 
    }
 
    public function subjectEntities() {
        return $this->belongsToMany(ReportSubjectEntity::class); 
    }

    public function types() {
        return $this->belongsToMany(ReportType::class); 
    }
}
