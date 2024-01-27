<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->middleware(['auth', 'verified'])->name('cart');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->middleware(['auth', 'verified'])->name('checkout');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/api/users', [ProfileController::class, 'getAllUsers']);
Route::get('/api/products', [App\Http\Controllers\ProfileController::class, 'getProducts']);
Route::get('/api/categories', [ProductController::class, 'getCategories']);
Route::get('/api/getProductsByCategories/{categoryId}', [ProductController::class, 'getProductByCategory']);

Route::post('/api/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/api/cart', [CartController::class, 'viewCart']);
Route::put('/api/cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity']);
Route::delete('/api/delete-cartitem/{cart_id}', [CartController::class, 'deleteCartItem']);

Route::get('/api/products/{categoryId}', [ProductController::class, 'getProductsByCategory']);


Route::post('/cart/add/{product}', [CartController::class, 'addToCart']);
Route::delete('/cart/remove/{product}', [CartController::class, 'removeFromCart']);
Route::put('/cart/update/{product}', [CartController::class, 'updateQuantity']);


require __DIR__.'/auth.php';
