/**
 * Testes para validateContactForm
 * T060–T068
 */
import { describe, it, expect } from 'vitest';
import { validateContactForm, MESSAGE_MIN_LENGTH } from '@/utils/validation';

const msgs = {
  required: 'Campo obrigatório',
  invalidEmail: 'E-mail inválido',
  messageTooShort: 'Mensagem muito curta',
};

const validData = {
  name: 'Gabriel',
  email: 'gabriel@example.com',
  subject: 'Teste de contato',
  message: 'Mensagem com mais de dez caracteres.',
};

describe('validateContactForm', () => {
  // T060: dados completos e válidos → valid: true, sem erros
  it('T060: retorna valid true para dados completos e válidos', () => {
    const result = validateContactForm(validData, msgs);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // T061: nome vazio → erro no campo name
  it('T061: retorna erro no campo name quando nome está vazio', () => {
    const result = validateContactForm({ ...validData, name: '' }, msgs);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe(msgs.required);
  });

  // T062: nome com apenas espaços → erro (trim check)
  it('T062: retorna erro no campo name quando nome contém apenas espaços', () => {
    const result = validateContactForm({ ...validData, name: '   ' }, msgs);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe(msgs.required);
  });

  // T063: email vazio → erro no campo email (required)
  it('T063: retorna erro no campo email quando email está vazio', () => {
    const result = validateContactForm({ ...validData, email: '' }, msgs);
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe(msgs.required);
  });

  // T064: email sem @ → erro de formato inválido
  it('T064: retorna erro de formato inválido para email sem @', () => {
    const result = validateContactForm({ ...validData, email: 'naoeumemail.com' }, msgs);
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe(msgs.invalidEmail);
  });

  // T065: email válido → sem erro de email
  it('T065: não retorna erro para email com formato válido', () => {
    const result = validateContactForm({ ...validData, email: 'usuario@dominio.com.br' }, msgs);
    expect(result.valid).toBe(true);
    expect(result.errors.email).toBeUndefined();
  });

  // T066: mensagem abaixo do mínimo → erro messageTooShort
  it('T066: retorna erro de mensagem muito curta para texto abaixo do mínimo', () => {
    const shortMsg = 'a'.repeat(MESSAGE_MIN_LENGTH - 1);
    const result = validateContactForm({ ...validData, message: shortMsg }, msgs);
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBe(msgs.messageTooShort);
  });

  // T067: mensagem com exatamente o mínimo de chars → sem erro
  it('T067: não retorna erro para mensagem com exatamente MESSAGE_MIN_LENGTH chars', () => {
    const exactMsg = 'a'.repeat(MESSAGE_MIN_LENGTH);
    const result = validateContactForm({ ...validData, message: exactMsg }, msgs);
    expect(result.valid).toBe(true);
    expect(result.errors.message).toBeUndefined();
  });

  // T068: subject é opcional — nenhum erro quando ausente ou vazio
  it('T068: subject é opcional e não gera erro quando ausente ou vazio', () => {
    const withoutSubject = validateContactForm({ ...validData, subject: undefined }, msgs);
    const withEmptySubject = validateContactForm({ ...validData, subject: '' }, msgs);
    expect(withoutSubject.valid).toBe(true);
    expect(withoutSubject.errors.subject).toBeUndefined();
    expect(withEmptySubject.valid).toBe(true);
    expect(withEmptySubject.errors.subject).toBeUndefined();
  });
});
