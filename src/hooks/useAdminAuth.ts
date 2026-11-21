// src/hooks/useAdminAuth.ts
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FunctionsHttpError } from '@supabase/supabase-js'; // ✅ Idinagdag

export function useAdminAuth() {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async (loginEmail: string, pass: string) => {
    setLoading(true);
    setError('');
    
    // ✅ I-normalize ang email (trim at lowercase)
    const normalizedEmail = loginEmail.trim().toLowerCase();
    setEmail(normalizedEmail);

    // 1. Check credentials sa Supabase Auth
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: pass,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Trigger OTP via Edge Function
    try {
      const { error: fnError } = await supabase.functions.invoke('send-otp', {
        body: { email: normalizedEmail },
      });

      if (fnError) {
        // ✅ I-READ ANG TOTOONG ERROR BODY
        if (fnError instanceof FunctionsHttpError) {
          const res = fnError.context as Response;
          const bodyText = await res.text();
          
          console.error('❌ Edge Function Status:', res.status);
          console.error('❌ Edge Function Body:', bodyText);
          
          try {
            const parsed = JSON.parse(bodyText);
            // Ipakita ang totoong error message at debug info
            console.error('❌ Debug Info:', parsed.debug);
            setError(parsed.error || `Error ${res.status}`);
          } catch {
            setError(`Error ${res.status}: ${bodyText}`);
          }
        } else {
          setError(fnError.message);
        }
        
        throw fnError;
      }
      
      setStep('otp');
    } catch (err: any) {
      // ✅ Kung unauthorized, i-sign out agad para hindi mag-stay ang session
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    setLoading(true);
    setError('');

    // Hanapin ang OTP sa database
    const { data, error: fetchError } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gte('expires_at', new Date().toISOString())
      .limit(1)
      .single();

    if (fetchError || !data) {
      setError('Invalid or expired OTP.');
      setLoading(false);
      return;
    }

    // Success! Delete OTP para hindi na magamit
    await supabase.from('otps').delete().eq('id', data.id);

    // I-save sa session storage para maalala na verified
    sessionStorage.setItem('otp_verified', 'true');
    
    // Refresh page para lumabas ang Dashboard
    window.location.reload();
  };

  return { step, setStep, loading, error, handleLogin, handleVerifyOtp };
}