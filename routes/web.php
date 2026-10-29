<?php

use App\Http\Controllers\DesignSelectorController;
use Illuminate\Support\Facades\Route;

Route::get('/', DesignSelectorController::class)->name('home');
