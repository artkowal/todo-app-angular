import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { z } from 'zod';

export function zodValidator(schema: z.ZodTypeAny): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const parsed = schema.safeParse(control.value)

        if(parsed.success) {
            return null;
        } else {
            const firstErrorMessage = parsed.error.issues[0].message;
            return { zodError: firstErrorMessage};
        }
    }
}