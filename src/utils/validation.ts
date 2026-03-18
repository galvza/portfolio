export const MESSAGE_MIN_LENGTH = 10;

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ValidationMessages {
  required: string;
  invalidEmail: string;
  messageTooShort: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida os dados do formulário de contato.
 * Retorna `valid: true` se todos os campos obrigatórios passam nas validações.
 */
export function validateContactForm(
  data: ContactFormData,
  messages: ValidationMessages,
): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = messages.required;
  }

  if (!data.email.trim()) {
    errors.email = messages.required;
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = messages.invalidEmail;
  }

  if (!data.message.trim()) {
    errors.message = messages.required;
  } else if (data.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = messages.messageTooShort;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
