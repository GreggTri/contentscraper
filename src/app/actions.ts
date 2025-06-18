'use server'

import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginUser(data: { email: string; password: string; }){
    

    try{
        const {email, password} = data

        const foundUser = await prisma.user.findUnique({
            where: { email },
            select: { id: true, password: true },
        })

        if (!foundUser) {
            return { success: false, message: 'Invalid login credentials.' };
        }

        const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password,
        );

        if (!passwordMatch) {
            return { success: false, message: 'Invalid login credentials.' };
        } else {
            //create session if email and password match
            await createSession(foundUser.id, email)

            return {
                success: true,
                message: "Sign In completed"
            }
        }

    } catch(error){
        console.log(error);
        return { success: false, message: 'Invalid login credentials.' };
    }
}



export async function logout() {
    deleteSession();
    redirect('/login');
}