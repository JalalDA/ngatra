import { NextResponse, NextRequest } from "next/server";
import { Midtrans } from 'midtrans-client-typescript'
import { generateOrderId } from "@/lib/generate";

export async function POST(req: NextRequest) {
    try {
        const serverKey = `${process.env.MIDTRANS_SANBOX_SERVER_KEY}`
        const clientKey = `${process.env.MIDTRANS_SANBOX_CLIENT_KEY}`
        const snap = new Midtrans.Snap({
            clientKey,
            serverKey,
            isProduction: false
        })

        const order_id = generateOrderId()

        const response = await snap.createTransaction({
            transaction_details: {
                order_id,
                gross_amount: 50000,
            },
            customer_details: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@example.com',
                phone: '08123456789'
            },
            credit_card: {
                secure: true,
            },
        })

        // Response URL Snap
        return NextResponse.json({
            response
        });
    } catch (error: any) {
        console.log({ error });
        if (error.response) {
            console.error("Midtrans API Response Error:", error.response.data);
            return NextResponse.json(
                { error: error.response.data },
                { status: error.response.status }
            );
        }

        console.error("Midtrans API Error:", error.message);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest) {

    return NextResponse.json({
        msg: "Wellcome"
    });
}