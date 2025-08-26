<?php

namespace App\Http\Controllers;

use App\Models\Ukt;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function __construct(){
        Config::$serverKey =  config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function payment (Request $request){
          $params = [
            'transaction_details' => [
                'order_id' => 'UKT-' . $request->id . '-' . uniqid(),
                'gross_amount' => $request->amount, 
    
            ],
            'customer_details' => [
                'first_name' => $request->name,
                'email' => $request->email,
            ],
        ];
        // Dapatkan Snap Token dari Midtrans
        $snapToken = Snap::getSnapToken($params);

        // Balikkan ke React (JSON)
        return response()->json([
            'snapToken' => $snapToken,
        ]);
    }

    public function callback(Request $request){
        $notif = new Notification();

        $transaction = $notif->transaction_status;
        $type = $notif->payment_type;
        $orderId = $notif->order_id;
        $fraud = $notif->fraud_status;

        // Pastikan order_id formatnya misalnya: uniqid()."-".$uktId
        $parts = explode('-', $orderId);  
        $uktId = $parts[1] ?? null; 

        if($uktId){
            $ukt = Ukt::findOrFail($uktId);

            if ($transaction == "capture" || $transaction == "settlement") {
                $ukt->update([
                    "status"=>"lunas",
                    "tanggal_pembayaran"=>Carbon::now("Asia/Jakarta"),
                    "nominal_pembayaran"=>$notif->gross_amount
                ]);
            }
        }
    }
}