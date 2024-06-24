<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitReportingController extends Controller
{
    public function getVisitReports()
    {
        $visits = Visit::with(['doctor', 'user', 'location'])->get();
        
        // Transforming the visits data to include doctor details in a separate field.
        $visitReports = $visits->map(function($visit) {
            return [
                'visit_date' => $visit->visit_date,
                'visit_time' => $visit->visit_time,
                'purpose' => $visit->purpose,
                'location' => $visit->location,
                'doctors' => [$visit->doctor], // Assuming one doctor per visit for simplicity
                'user' => $visit->user,
            ];
        });

        return response()->json($visitReports);
    }
}
