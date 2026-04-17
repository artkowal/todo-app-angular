import { z } from 'zod';

export const accountSchema = z.object({
  email: z.string()
    .min(1, { message: 'Adres email jest wymagany' })
    .email({ message: 'Niepoprawny format adresu email' }),
  
  password: z.string()
    .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
  
  confirmPassword: z.string()
    .min(1, { message: 'Potwierdzenie hasła jest wymagane' })
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła nie są identyczne',
  path: ['confirmPassword']
});

export type AccountData = z.infer<typeof accountSchema>;

export const personalDataSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'Imię musi mieć co najmniej 2 znaki' }),
  
  lastName: z.string()
    .min(2, { message: 'Nazwisko musi mieć co najmniej 2 znaki' }),
  
  phone: z.string()
    .optional()
    .refine(val => !val || /^\d{9}$/.test(val), {
      message: 'Numer telefonu musi składać się dokładnie z 9 cyfr'
    })
});

export type PersonalData = z.infer<typeof personalDataSchema>;