<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tool;
class ToolsController extends Controller
{
    public function index()
    {
        $tools = Tool::all();
        return response()->json($tools);
    }



}
