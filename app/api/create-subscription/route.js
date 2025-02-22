import { NextResponse } from "next/server";

const plans = [
    {
        plan_id: 'P-9UV279472X937293AM64ITEA',
        plan_name: 'test',
        duration: 'month'
    },
    // {
    //     plan_id: '',
    //     plan_name: 'pro',
    //     duration: 'month'
    // },
    // {
    //     plan_id: '',
    //     plan_name: 'core',
    //     duration: 'month'
    // },
]

const generateAccessToken = async () => {
    const client_id = 'AQXrW7T_PxeDN_ZoGvbof0wZua1Yuy0QbfVHZiStxMkM8HYWSY1NHe8ZnT8MERmrOk8T0W3vNCPPexCs';
    const secret = 'EI1uVeBjeQeSi7Ql70PxS2fs1lH_g8Drx0dbtelkgkxJU22SGSw1jPyzcGB1TUBIirgQm6ZYvlZJ4KtX';

    const auth = Buffer.from(client_id + ":" + secret).toString("base64");

    const url = 'https://api-m.paypal.com/v1/oauth2/token'

    const response = await fetch(url, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`
        }
    })

    const data = await response.json();
    return data.access_token;
}

export async function POST(req, res) {
    const { plan_name, duration } = await req.json();


    const plan = plans.find(_plan => _plan.duration === duration && _plan.plan_name === plan_name);

    if (!plan) {
        return NextResponse.json({ success: false, message: 'Plan not found!' });
    }

    const accessToken = await generateAccessToken();

    const url = 'https://api-m.paypal.com/v1/billing/subscriptions'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Prefer': 'return=representation',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ "plan_id": "P-9UV279472X937293AM64ITEA", "quantity": "1", "shipping_amount": { "currency_code": "USD", "value": "1.00" }, "subscriber": { "name": { "given_name": "John", "surname": "Doe" }, "email_address": "customer@example.com", "shipping_address": { "name": { "full_name": "John Doe" }, "address": { "address_line_1": "2211 N First Street", "address_line_2": "Building 17", "admin_area_2": "San Jose", "admin_area_1": "CA", "postal_code": "95131", "country_code": "US" } } }, "application_context": { "brand_name": "walmart", "locale": "en-US", "shipping_preference": "SET_PROVIDED_ADDRESS", "user_action": "SUBSCRIBE_NOW", "payment_method": { "payer_selected": "PAYPAL", "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED" }, "return_url": "https://example.com/returnUrl", "cancel_url": "https://example.com/cancelUrl" } })

        // body: JSON.stringify({
        //     plan_id: plan.plan_id,
        //     application_context: {
        //         user_action: 'SUBSCRIBE_NOW'
        //     }
        // })
    });

    const data = await response.json()

    return NextResponse.json({ success: true, data });
}
