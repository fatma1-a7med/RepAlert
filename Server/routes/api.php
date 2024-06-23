<?php

use App\Http\Controllers\Api\SalesController;
use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\ForgotPasswordAdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordAdminController;
use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\LoctionController;
use App\Http\Controllers\doctorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\VisitReportingController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// routes/api.php
Route::middleware('auth:api')->get('/admin', function (Request $request) {
    return $request->user(); // This will return the authenticated admin details
});


Route::prefix('admin')->group(function () {
    Route::post('register', [AdminAuthController::class, 'createAdmin']);
    Route::post('login', [AdminAuthController::class, 'loginAdmin'])->name('loginAdmin');
    Route::post('password/email', [ForgotPasswordAdminController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('password/reset/{token}', [ResetPasswordAdminController::class, 'reset'])->name('password.reset');
    
    //sales
    Route::apiResource('sales', SalesController::class);
    // Route::get('users/{user}/sales', [SalesController::class,'user_sales']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AdminAuthController::class, 'me']);
        Route::post('logout', [AdminAuthController::class, 'logout']);
        Route::get('logged-in-admin', [AdminAuthController::class, 'getLoggedInAdmin']);
    });

    //admin visit routes
    Route::get('visits', [VisitController::class, 'index']);
    Route::get('/visit/{id}', [VisitController::class, 'getVisitInformationById']);
    Route::get('visits/searchByUsername/{username}', [VisitController :: class, 'searchByUsername' ]);
    Route::get('visits/searchByDateRange/{startDate}/{endDate}', [VisitController::class, 'searchByDateRange']);

    //admin location tracking
    Route::get('/location',[LoctionController::class,'index']);
    Route::post('/location', [LoctionController::class, 'store']);



    
    Route::get('visits/history/{user_id}', [VisitController::class, 'getVisitHistory']);
    Route::get('visits/planned/{user_id}', [VisitController::class, 'getPlannedVisits']);
   
    Route::get('/visits/recent', [VisitController::class, 'recent']);
});

Route::prefix('user')->group(function () {
    Route::post('login', [UserAuthController::class, 'loginUser']);
    Route::middleware('auth:sanctum')->get('info',[UserAuthController::class, 'getUserId']);
    Route::middleware('auth:sanctum')->get('UserInfo',[UserAuthController::class, 'getUser']);
    Route::middleware('auth:sanctum')->post('/logout', [UserAuthController::class, 'logoutUser']);
    Route::middleware('auth:sanctum')->get('/sales', [\App\Http\Controllers\Users_Controllers\salesController::class, 'index']);
    Route::middleware('auth:sanctum')->get('/sales/{id}', [\App\Http\Controllers\Users_Controllers\salesController::class, 'show']);


    //doctor Routes
    Route::post('add-doctor', [doctorController:: class, 'AddDoctor']);
    Route::get('get-all-doctors', [doctorController:: class, 'gettAllDoctors']);
    Route::get('get-doctor-byId/{id}', [doctorController:: class, 'show']);
    Route::delete('delete-doctor-byId/{id}', [doctorController:: class, 'destroy']);
    Route::put('update-doctor-byId/{id}', [doctorController:: class, 'update']);
    Route::get('search/{username}', [doctorController:: class, 'search']);


});

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);         // GET /api/users
    Route::post('/', [UserController::class, 'store']);        // POST /api/users
    Route::get('/{id}', [UserController::class, 'show']);      // GET /api/users/{id}
    Route::put('/{id}', [UserController::class, 'update']);    // PUT /api/users/{id}
    Route::delete('/{id}', [UserController::class, 'destroy']); // DELETE /api/users/{id}
});

// visit reporting
Route::get('/visit-reports', [VisitReportingController::class, 'getVisitReports']);




