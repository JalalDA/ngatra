import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password harus berisi minimal 8 karakter"),
  })

export type TSignInSchema = z.infer<typeof signInSchema>;


export const organizationSchema = z.object({
  name: z.string().min(1, "Nama organisasi wajib di isi"),
  industryId : z.string().min(1, "Jenis industry wajib di isi"),
  employee : z.string().min(1, "Jumlah karyawan wajib di isi"),
  ordered_month : z.string().min(1, "Jumlah order bulanan wajib di isi")
})

export type TOrganizationSchema = z.infer<typeof organizationSchema>