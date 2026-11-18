import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { SERVICE_OPTIONS } from '../data/content';

/** Set to a URL to enable real submission. `null` = frontend demonstration. */
const FORM_ENDPOINT: string | null = null;

type FieldId = 'name' | 'email' | 'phone' | 'svcsel' | 'msg';
type Errors = Partial<Record<FieldId, string>>;
type Status = { kind: 'idle' | 'ok' | 'no'; text: string };
type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const RULES: Record<FieldId, (v: string) => string> = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Enter your full name.'),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? ''
      : 'Enter a valid email address, for example name@company.com.',
  phone: (v) =>
    !v.trim() || /^\+?[\d\s()-]{7,}$/.test(v.trim())
      ? ''
      : 'Use digits, spaces, + or dashes only (at least 7 digits).',
  svcsel: (v) => (v ? '' : 'Select the service you need.'),
  msg: (v) =>
    v.trim().length >= 10 ? '' : 'Describe your request in at least 10 characters.',
};

const FIELD_IDS: FieldId[] = ['name', 'email', 'phone', 'svcsel', 'msg'];

export function useContactForm(preferredService: string | null) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' });
  const formRef = useRef<HTMLFormElement | null>(null);

  // Preselect a service coming from the "Request this service" button.
  useEffect(() => {
    if (!preferredService) return;
    const select = formRef.current?.querySelector<HTMLSelectElement>('#svcsel');
    if (!select) return;
    const idx = SERVICE_OPTIONS.indexOf(preferredService);
    if (idx < 0) return;
    select.selectedIndex = idx + 1;
    setErrors((prev) => {
      if (!prev.svcsel) return prev;
      const { svcsel: _removed, ...rest } = prev;
      return rest;
    });
  }, [preferredService]);

  const validate = useCallback((id: FieldId, value: string): boolean => {
    const msg = RULES[id](value);
    setErrors((prev) => {
      if (prev[id] === msg || (!prev[id] && !msg)) return prev;
      return { ...prev, [id]: msg };
    });
    return !msg;
  }, []);

  const check = useCallback(
    (id: FieldId): boolean => {
      const el = formRef.current?.querySelector<FormField>('#' + id);
      if (!el) return false;
      return validate(id, el.value);
    },
    [validate]
  );

  const onBlur = useCallback(
    (id: FieldId) => () => {
      check(id);
    },
    [check]
  );

  // React 19 types onInput as InputEventHandler<T> whose event is InputEvent<T>.
  // FormEvent<T> is the common base for InputEvent<T> and ChangeEvent<T>, so a
  // handler typed with FormEvent<T> is assignable to onInput on any element.
  const onInput = useCallback(
    <T extends FormField>(id: FieldId) =>
      (e: FormEvent<T>) => {
        if (errors[id]) validate(id, e.currentTarget.value);
      },
    [errors, validate]
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      const bad: FieldId[] = [];
      FIELD_IDS.forEach((id) => {
        const el = form.querySelector<FormField>('#' + id);
        if (!el) return;
        if (!validate(id, el.value)) bad.push(id);
      });

      if (bad.length) {
        setStatus({
          kind: 'no',
          text:
            'Fix the ' +
            bad.length +
            ' highlighted field' +
            (bad.length > 1 ? 's' : '') +
            ', then submit again.',
        });
        form.querySelector<HTMLElement>('#' + bad[0])?.focus();
        return;
      }

      if (!FORM_ENDPOINT) {
        setStatus({
          kind: 'ok',
          text:
            'Form checked successfully. This is a frontend demonstration, so your inquiry was not sent. Your entries have been kept.',
        });
        return;
      }

      const payload: Record<string, string> = {};
      const fieldMap: Record<string, string> = {
        name: 'name',
        org: 'org',
        email: 'email',
        phone: 'phone',
        svcsel: 'service',
        msg: 'message',
        website: 'website',
      };
      Object.entries(fieldMap).forEach(([domId, key]) => {
        const el = form.querySelector<FormField>('#' + domId);
        payload[key] = (el?.value ?? '').trim();
      });

      setStatus({ kind: 'ok', text: 'Sending…' });
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('bad response');
        setStatus({ kind: 'ok', text: 'Your inquiry was sent.' });
        form.reset();
      } catch {
        setStatus({
          kind: 'no',
          text: 'Your inquiry could not be sent. Please try again.',
        });
      }
    },
    [validate]
  );

  return { formRef, errors, status, onBlur, onInput, onSubmit };
}