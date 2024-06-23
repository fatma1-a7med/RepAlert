<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitReportingController extends Controller
{
    public function getVisitReports()
    {
        $visits = Visit::with(['doctors', 'user', 'location'])->get();
        return response()->json($visits);
    }
}
