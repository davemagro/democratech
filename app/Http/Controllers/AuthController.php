<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function signup() {
        return Inertia::render('Auth/SignUp'); 
    }

    public function signupSave() {
        $validated = request()->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string', 
            'confirmPassword' => 'confirmed:password'
        ]); 

        $user = new User($validated); 
        $user->name = '';
        $user->save(); 

        return redirect()->route('signin')->withSuccess('Account has been created successfully'); 
    }

    // sign in 
    public function signin() {
        return Inertia::render('Auth/SignIn'); 
    }

    public function signinSave() {
        $validated = request()->validate([
            'email' => 'required|email', 
            'password' => 'required|string'
        ]); 
        
        if (\Auth::attempt($validated)) {
            return redirect()->route('home')->withSuccess('You have been logged in successfully'); 
        }

        return redirect()->route('signin')->withErrors('Invalid credentials'); 
    }

}
