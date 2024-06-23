<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

class ResetPasswordAdminController extends Controller
{
    public function __construct(){
        $this->middleware('guest');
    }

    /**
     * Show the reset password form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function showResetForm(Request $request, $token)
    {
        return response()->json([
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    /**
     * Handle a reset password request for an admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

  
 
        $status = Password::broker('admins')->reset(
            array_merge($request->only('email', 'password', 'password_confirmation','token')),
            function ($admin, $password) {
                $admin->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $admin->save();

                event(new PasswordReset($admin));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['message' => trans($status)])
            : response()->json(['message' => trans($status)], 400);
    }
}
