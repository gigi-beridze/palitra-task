<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Categories;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function getCategories() {
        $data = Categories::all();

        return $data;
    }
    public function getProductByCategory(Request $request) {
        $categoryId = $request->categorieId;
        $data = Products::where('categorieId', $categoryId);
        return $data;
    }
    public function addToCart(Request $request) {
        if(auth('sanctum')->check()) {
            $userId = auth('sanctum')->user()->id;
            $productId = $request->product_id;
            $productQty = $request->product_qty;

            $productCheck = Products::where('id', $productId)->first();

            if ($productCheck) {
                if(Cart::where('product_id', $productId)->where('user_id', $userId)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name.'already added',
                    ]);
                } else {
                    $cartItem = new Cart;
                    $cartItem->user_id = $userId;
                    $cartItem->product_id = $productId;
                    $cartItem->product_qty = $productQty;
                }
                return response()->json([
                    'status' => 201,
                    'message' => 'im in add cart',
                ]);
            }

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'login to add cart',
            ]);
        }
    }
}
