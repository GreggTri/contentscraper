import 'server-only'
import bcrypt from 'bcrypt';
import { type NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    if(process.env.ENVIRONMENT === "dev"){

        const { email, password} = await request.json()

        console.log(email);
        console.log(password);
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        if (existingUser){
            return NextResponse.json({ error: "Internal server error" }, { status: 500 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword
            }
        })
        return NextResponse.json({ success: true, user })
    }
  } catch (error) {
    console.error("register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}