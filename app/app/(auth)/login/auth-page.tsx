"use client"
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface AuthFormInputs {
    email: string;
    password: string;
    confirmPassword?: string; // Only for Register
    username?: string; // Only for Register
}
import LoginButtonGoogle from "./login-button-google";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/icons/loading-dots";
import { registerCredentials } from "@/lib/actions";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and register
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormInputs>();

    const toggleAuthMode = (): void => setIsLogin((prev) => !prev);
    const togglePasswordVisibility = (): void => setShowPassword((prev) => !prev);
    const toogleConfirmVisibility = (): void => setShowConfirm((prev) => !prev)

    const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
        if (!isLogin && data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (isLogin) {
            const response = await signIn("credentials", { email: data.email, password: data?.password, redirect: true })
            console.log({ response });

        } else {
            console.log("register");

            const response = await registerCredentials(data)
            console.log({ response });
            if (response.status) {
                setIsLogin(true)
            }
        }
    };


    return (
        <div className="container w-full text-black h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-blue-200">
            <div className="form-wrapper bg-white p-8 rounded-lg shadow-lg w-96">
                {/* Logo */}
                <div className="logo text-center text-2xl font-bold mb-6">ngatra</div>

                {/* Google Sign-In */}
                <LoginButtonGoogle />

                {/* Divider */}
                <div className="divider flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-sm text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="input-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email*
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="hello@yourmail.com"
                            className={`mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-3 py-2 ${errors.email ? "border-red-500" : ""
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Username - Only for Register */}
                    {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username*
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register("username", { required: "Username is required" })}
                                placeholder="Enter Your Username"
                                className={`mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-3 py-2 ${errors.username ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                            )}
                        </div>
                    )}

                    {/* Password */}
                    <div className="input-group password-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password*
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                placeholder="Enter Your Password"
                                className={`mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-3 py-2 pr-10 ${errors.password ? "border-red-500" : ""
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2.5 text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password - Only for Register */}
                    {!isLogin && (
                        <div className="input-group password-group">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password*
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",
                                    })}
                                    placeholder="Confirm Your Password"
                                    className={`mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-3 py-2 pr-10 ${errors.confirmPassword ? "border-red-500" : ""
                                        }`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-gray-500"
                                    onClick={toogleConfirmVisibility}
                                >
                                    {showConfirm ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    )}

                    {/* Forgot Password - Only for Login */}
                    {isLogin && (
                        <a href="#" className="forgot-password text-sm text-gray-600 hover:underline">
                            Forgot Password?
                        </a>
                    )}

                    {/* Terms - Only for Register */}
                    {!isLogin && (
                        <p className="terms text-sm text-gray-600 mt-4">
                            By signing up you agree with our{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                Privacy Policy
                            </a>.
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="signup-button w-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold py-2 rounded-md shadow hover:opacity-90"
                    >
                        {
                            isSubmitting ?
                                <LoadingDots color="#A8A29E" /> :
                                isLogin ? "LOGIN" : "SIGN UP"
                        }
                    </button>
                </form>

                {/* Toggle Auth Mode */}
                <p className="login-link text-center text-sm text-gray-600 mt-4">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button onClick={toggleAuthMode} className="text-blue-500 hover:underline">
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button onClick={toggleAuthMode} className="text-blue-500 hover:underline">
                                Login
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
