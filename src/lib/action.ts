"use server"

import { hashSync } from "bcrypt-ts"
import { registerSchema } from "./zod"
import { prisma } from "../../lib/prisma"
import { redirect } from "next/navigation"
import { RegisterSchema } from "@/components/auth/form-register"
import { TOrganizationSchema, TSignInSchema } from "./types"
import { signIn } from "../../auth"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect"

export const signUpCredentials = async (data: RegisterSchema) => {
    const { name, email, password } = data

    const existUser = await prisma.user.findFirst({
        where: { email: email }
    })
    if (existUser) {
        return {
            message: "User telah terdaftar",
            success : false
        }
    }
    const hashedPassword = hashSync(password, 10)
    try {
       const data = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
        if(data){
            return {
                message : "Register success",
                success : true
            }
        }
    } catch (error) {
        console.log({error});
        return {
            message: "Register gagal",
            success : false
        }
    }
}

export const signInCreadentials = async (data : TSignInSchema)=>{
    try {
        const {email, password} = data
        const user = await prisma.user.findFirst({
            where : {
              email,
            }
          })
          if(!user){
            return {
                message : "user not found",
                success : false
            }
          }
          const result = await signIn("credentials", {email, password, redirectTo : `/setup`})
          console.log({result});
          return result
    } catch (error) {
        if(isRedirectError(error)){
            console.log({error});
            throw error
        }
        if(error instanceof AuthError){
            if(error.type === "CredentialsSignin"){
                return {
                    message : "Invalid Credentials",
                    success : false
                }
            }
        }
        throw error
    }
}

export const createOrganization = async (data : TOrganizationSchema)=>{

}