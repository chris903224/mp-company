import { BUSINESS, SERVICE_OPTIONS } from '../data/content';
import { useContactForm } from '../hooks/useContactForm';

interface ContactFormProps {
  preferredService: string | null;
}

export default function ContactForm({ preferredService }: ContactFormProps) {
  const { formRef, errors, status, onBlur, onInput, onSubmit } = useContactForm(preferredService);

  return (
    <form id="qf" ref={formRef} noValidate aria-label="Inquiry form" onSubmit={onSubmit}>
      <div className={`f${errors.name ? ' bad' : ''}`}>
        <label htmlFor="name">Full name *</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          aria-required="true"
          aria-describedby="e-name"
          aria-invalid={errors.name ? 'true' : undefined}
          onBlur={onBlur('name')}
          onInput={onInput('name')}
        />
        <span className="err" id="e-name">
          {errors.name ?? ''}
        </span>
      </div>

      <div className="f">
        <label htmlFor="org">Company / Organization</label>
        <input id="org" name="org" autoComplete="organization" />
      </div>

      <div className={`f${errors.email ? ' bad' : ''}`}>
        <label htmlFor="email">Email address *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-describedby="e-email"
          aria-invalid={errors.email ? 'true' : undefined}
          onBlur={onBlur('email')}
          onInput={onInput('email')}
        />
        <span className="err" id="e-email">
          {errors.email ?? ''}
        </span>
      </div>

      <div className={`f${errors.phone ? ' bad' : ''}`}>
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-describedby="e-phone"
          aria-invalid={errors.phone ? 'true' : undefined}
          onBlur={onBlur('phone')}
          onInput={onInput('phone')}
        />
        <span className="err" id="e-phone">
          {errors.phone ?? ''}
        </span>
      </div>

      <div className={`f full${errors.svcsel ? ' bad' : ''}`}>
        <label htmlFor="svcsel">Service needed *</label>
        <select
          id="svcsel"
          name="service"
          aria-required="true"
          aria-describedby="e-svcsel"
          aria-invalid={errors.svcsel ? 'true' : undefined}
          onBlur={onBlur('svcsel')}
          onInput={onInput('svcsel')}
        >
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <span className="err" id="e-svcsel">
          {errors.svcsel ?? ''}
        </span>
      </div>

      <div className={`f full${errors.msg ? ' bad' : ''}`}>
        <label htmlFor="msg">Message *</label>
        <textarea
          id="msg"
          name="message"
          aria-required="true"
          aria-describedby="e-msg"
          aria-invalid={errors.msg ? 'true' : undefined}
          onBlur={onBlur('msg')}
          onInput={onInput('msg')}
        />
        <span className="err" id="e-msg">
          {errors.msg ?? ''}
        </span>
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="demo">
        <b>Frontend demonstration:</b> this form validates input but is not connected to an email or
        submission service, so nothing is delivered to the business.
      </p>

      <div className={`msg${status.kind !== 'idle' ? ' ' + status.kind : ''}`} id="fm" role="status" aria-live="polite">
        {status.text}
      </div>

      <div className="f full">
        <button className="btn btn-p" type="submit" style={{ alignSelf: 'flex-start' }}>
          Submit Inquiry
        </button>
      </div>
    </form>
  );
}