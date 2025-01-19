"use client"

import { AuthFormInputs, registerCredentials, signInCredentials } from "@/lib/actions";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingDots from "../icons/loading-dots";
import { signIn } from "next-auth/react";

type AuthForm = {
    email: string;
    password: string;
}

export function AuthForm({ }: {
}) {

    const {
        formState: { isSubmitting, errors },
        register,
        handleSubmit
    } = useForm<AuthForm>()
    const [isLogin, setIsLogin] = useState(false)
    const handleAuth = async (data: AuthFormInputs) => {
        if (isLogin) {
            const result = await signIn("credentials", {
                redirect: true,
                email: data?.email,
                password: data?.password
            })
            console.log({result});
        } else {
            const response = await registerCredentials(data)
            if (response.status) {
                toast.success(response.message)
                setIsLogin(true)
            } else {
                toast.error(response.message)
            }
        }
    }
    return (
        <form
            onSubmit={handleSubmit(async data => {
                console.log({ data });
                await handleAuth(data)
            })}
            className="flex flex-col gap-y-4 mt-8 w-full"
        >
            <div className="bg-white w-full">
                <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-600"
                >
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    {...register("email", { required: "Email tidak boleh kosong" })}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@acme.com"
                    autoComplete="email"
                    className="mt-1 block w-full text-gray-900 appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-[#F0F0F0]"
                />
                {
                    errors.email?.message && <div className="text-red-500 mt-2">{errors.email.message}</div>
                }
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-600 flex items-center justify-between"
                >
                    <div>
                        Password <span className="text-red-500">*</span>
                    </div>
                    <Link href={"/forgot"} className="text-sm underline">Forgot Password?</Link>
                </label>
                <input
                    {...register("password", { required: "Password tidak boleh kosong" })}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    className="mt-1 block w-full text-gray-900 appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-[#F0F0F0]"
                />
                {
                    errors.password?.message && <div className="text-red-500 mt-2">{errors.password.message}</div>
                }
            </div>
            <button className="bg-gradient-to-r from-blue-500 via-purple-800 to-purple-400 py-2 px-3 rounded-full hover:from-purple-400 hover:to-blue-500 font-bold uppercase" type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
            {
                !isLogin && <span className="text-gray-800 text-xs text-center font-semibold">{`By signing up you agree with our Terms of Service and Privacy Policy`}</span>
            }
            {
                isLogin ?
                    <div className="text-sm font-bold text-gray-800 text-center">{`Don't have an account?`} <span onClick={() => setIsLogin(!isLogin)} className=" text-orange-500 font-bold cursor-pointer hover:scale-120 hover:text-orange-400 hover:font-extrabold animation transition-all ease-in-out text-md"> {isSubmitting ? <LoadingDots /> : "Sign Up"} </span></div> :
                    <div className="text-sm font-bold text-gray-800 text-center">{`Already have an account?`} <span onClick={() => setIsLogin(!isLogin)} className=" text-orange-500 font-bold cursor-pointer hover:scale-120 hover:text-orange-400 hover:font-extrabold animation transition-all ease-in-out text-md">{isSubmitting ? <LoadingDots /> : "Sign In"}</span></div>
            }
        </form>
    );
}
