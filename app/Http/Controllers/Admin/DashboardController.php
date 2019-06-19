<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:admin.index')->only(['index']);
    }

    public function index()
    {
        return view('layouts.app');
    }
}