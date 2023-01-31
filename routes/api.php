<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/products',[ProductController::class,'index'])->name('products.all');
// Route::post('/products',[ProductController::class,'store'])->name('products.store');
// Route::get('/products/{id}',[ProductController::class,'show'])->name('products.find');

// Route::put('/products/{id}',[ProductController::class,'update'])->name('product.update');
// Route::delete('/products/{id}',[ProductController::class,'destroy'])->name('product.delete');

Route::apiResource('/product',ProductController::class);