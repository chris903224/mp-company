import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import { SERVICE_OPTIONS } from '../data/content';
import { supabase } from '../lib/supabase';

type FieldId = 'name' | 'email' | 'phone' | 'svcsel' | 'msg';
type Errors = Partial<Record<FieldId, string>>;
type Status = { kind: 'idle' | 'ok' | 'no' | 'loading'; text: string };
type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// ✅ WEB3FORMS ACCESS KEY
const WEB3FORMS_KEY = 'c72573f7-412c-48e0-901f-4843e61c0ffb';

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

// ✅ HELPER: Send email notification via Web3Forms
async function sendEmailNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New Client Inquiry - ${data.service}`,
        from_name: 'MP Micro IT Solutions Website',
        name: data.name,
        email: data.email,
        phone: data.phone || 'Not provided',
        service: data.service,
        message: data.message,
      }),
    });
  } catch (err) {
    // Silently fail - hindi dapat ma-block ang form submission kung failed ang email
    console.warn('Email notification failed:', err);
  }
}

export function useContactForm(preferredService: string | null) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' });
  const formRef = useRef<HTMLFormElement | null>(null);

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

  const onInput = useCallback(
    <T extends FormField>(id: FieldId) =>
      (e: ChangeEvent<T>) => {
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

      setStatus({ kind: 'loading', text: 'Sending your inquiry...' });

      try {
        const name = (form.querySelector('#name') as HTMLInputElement).value.trim();
        const org = (form.querySelector('#org') as HTMLInputElement)?.value.trim() || '';
        const email = (form.querySelector('#email') as HTMLInputElement).value.trim();
        const phone = (form.querySelector('#phone') as HTMLInputElement).value.trim();
        const svcsel = (form.querySelector('#svcsel') as HTMLSelectElement).value;
        const msg = (form.querySelector('#msg') as HTMLTextAreaElement).value.trim();
        
        const serviceIndex = SERVICE_OPTIONS.indexOf(svcsel);

        // ✅ STEP 1: Save to Supabase (existing functionality - UNCHANGED)
        const { error } = await supabase.from('inquiries').insert([
          {
            name,
            company: org,
            email,
            phone,
            serviceindex: serviceIndex >= 0 ? serviceIndex : 3, 
            message: msg,
            stage: 0, 
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
          }
        ]);

        if (error) throw error;

        // ✅ STEP 2: Send email notification to Gmail (NEW - runs after Supabase save)
        // Hindi natin hinihintay ang result ng email para di ma-delay ang success message
        sendEmailNotification({
          name,
          email,
          phone,
          service: svcsel,
          message: msg,
        });

        setStatus({
          kind: 'ok',
          text: 'Thank you! Your inquiry has been sent successfully.',
        });
        form.reset();
      } catch (err: any) {
        setStatus({
          kind: 'no',
          text: err.message || 'Something went wrong. Please try again.',
        });
      }
    },
    [validate]
  );

  return { formRef, errors, status, onBlur, onInput, onSubmit };
}