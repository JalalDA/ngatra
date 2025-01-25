import { put } from "@vercel/blob";
import axios from "axios";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const response = await axios.post(`https://api.digiflazz.com/v1/cek-saldo`, {
            cmd: "deposit",
            username: "musoxoo3P7JD",
            sign: "3faa8ecb3afc60052ffcdbbc68e956f3"
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        },)
        console.log({ response });

        return NextResponse.json({ response });
    } catch (error) {
        console.log({ error });

        return NextResponse.json({ error });
    }

}
