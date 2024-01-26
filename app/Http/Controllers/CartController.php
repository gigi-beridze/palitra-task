<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Products;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class CartController extends BaseController
{
    public function addToCart(Request $request) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
            $productCheck = Products::where('id', $product_id)->first();

            if($productCheck) {
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name . 'Already exist!',
                    ]);
                } else {
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_qty = $product_qty;
                    $cartItem->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'added to Cart',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Add to Cart',
            ]);
        }
    }
    public function viewCart() {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::Where('user_id', $user_id)->get();

            return response()->json([
                'status'=> 401,
                'cart'=> $cartItems,
            ]);
        } else {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to view cart data'
            ]);
        }
    }
    public function updateQuantity($cart_id, $scope) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            
            if($scope == "inc"){
                $cartItem->product_qty += 1;
            }else if($scope == "dec") {
                $cartItem->product_qty -= 1;
            }
            $cartItem->update();

            return response()->json([
                'status'=> 200,
                'message'=> 'Quantity updated!'
            ]); 
        } else {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to continue'
            ]);
        }
    }
    public function deleteCartItem($cart_id) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::Where('id', $cart_id)->where('user_id', $user_id)->first();

            if($cartItem) {
                $cartItem->delete();

                return response()->json([
                    'status'=> 200,
                    'message'=> 'cart item removed'
                ]);
            } else {
                return response()->json([
                    'status'=> 404,
                    'cart'=> 'cart item not found',
                ]);
            }
        } else {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to remove cart   '
            ]);
        }
    }
}
