import { FormControl } from "@angular/forms";

export function PasswordValidator(control: FormControl) {
  let hasNumber = /\d/.test(control.value);
  let hasCapitalCase = /[A-Z]/.test(control.value);
  let hasSmallCase = /[a-z]/.test(control.value);
  let hasSpecialCharacters = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/.test(control.value);

  if (hasNumber && hasCapitalCase && hasSmallCase && hasSpecialCharacters) {
    return null;
  }

  return { passwordStrength: true }
}
