<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportImage;
use App\Models\ReportFile;
use App\Models\ReportType;
use App\Models\ReportSubjectEntity;
use App\Models\ReportLocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmitReportController extends Controller
{
    public function index() {
        return Inertia::render('SubmitReport'); 
    }

    public function save() {

        $form = request()->validate([
            'detail_body' => 'string', 
            'detail_images' => 'nullable|array', 
            'detail_images.*' => 'image', 
            'detail_files' => 'nullable|array', 
            'detail_files.*' => 'file', 
            'categories' => 'nullable|array', 
            'categories.*' => 'string', 
            'subject_entities' => 'nullable|array', 
            'subject_entities.*' => 'string', 
            'locations' => 'nullable|array', 
            'locations.*' => 'array'
        ]);

        $report = new Report(); 
        $report->body = $form['detail_body']; 
        $report->user_id = auth()->id(); // Associate report with authenticated user
        $report->save(); 

        if (request()->hasFile("detail_images")) {
            $files = request()->file('detail_images'); 

            $reportImgs = []; 
            foreach($files as $file) {
                if (!$file->isValid()) continue;
                
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('report_images/' . auth()->user()->id, $filename, 'public'); 
                $reportImgs[] = new ReportImage(['path' => 'storage/' . $path]); 
            }
            $report->images()->saveMany($reportImgs); 
        }

        if (request()->hasFile("detail_files")) {
            $files = request()->file('detail_files'); 

            $reportFiles = []; 
            foreach($files as $file) {
                if (!$file->isValid()) continue;
                
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('report_files/' . auth()->user()->id, $filename, 'public'); 
                $reportFiles[] = new ReportFile([
                    'path' => 'storage/' . $path, 
                    'file_name' => $file->getClientOriginalName(), 
                    'file_type' => $file->getClientOriginalExtension(), 
                    'file_size' => $file->getSize()
                ]); 
            }
            $report->files()->saveMany($reportFiles); 
        }        

        // For each submitted category, create a new report type if it doesn't exist, and associate the report with the report type
        $reportTypes = []; 
        foreach (($form['categories'] ?? []) as $cat) {
            $reportType = ReportType::firstOrCreate(['name' => $cat]); 
            $reportTypes[] = $reportType->id; 
        }
        $report->types()->attach($reportTypes); 


        // For each submitted subject entity, create a new subject entity if it doesn't exist, and associate the report with the subject entity
        $subjectEntities = []; 
        foreach (($form['subject_entities'] ?? []) as $entity) {
            $subjectEntity = ReportSubjectEntity::firstOrCreate(['name' => $entity]); 
            $subjectEntities[] = $subjectEntity->id; 
        }
        $report->subjectEntities()->attach($subjectEntities); 

        $locations = []; 
        foreach (($form['locations'] ?? []) as $location) {
            $locations[] = new ReportLocation(['province' => $location['province'], 'municipality' => $location['municipality'], 'barangay' => $location['barangay']]); 
        }
        $report->locations()->saveMany($locations); 

        return redirect()->route('home');
    }
}
