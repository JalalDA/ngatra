import { object, string } from "zod";

export const registerSchema = object({
    name : string().min(1, "Nama wajib di isi"),
    email : string().min(1, "Email wajib di isi"),
    password : string().min(8, "Password wajib berisi minimal 8 karakter"),
    confirmPassword : string().min(8, "Confirm password wajib berisi minimal 8 karakter")
})