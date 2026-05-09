import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiClient from '@/api/httpClient';

type Status = 'loading' | 'success' | 'error';

export const NewsletterUnsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('This unsubscribe link is invalid.');
      return;
    }

    apiClient
      .get(`/api/v1/newsletter/unsubscribe/${token}`)
      .then((res) => {
        setStatus('success');
        setMessage(res.data.message || "You've been unsubscribed.");
      })
      .catch((err) => {
        setStatus('error');
        setMessage(
          err?.response?.data?.message || 'This link is invalid or has already been used.'
        );
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {status === 'loading' && (
          <>
            <Loader2 className="h-12 w-12 text-[#DD2C6C] mx-auto mb-6 animate-spin" />
            <p className="text-white/50 text-sm">Processing your request…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-7 w-7 text-[#DD2C6C]" />
            </div>
            <h1 className="text-white font-black text-2xl mb-3">All done.</h1>
            <p className="text-white/45 text-sm mb-8">{message}</p>
            <p className="text-white/25 text-xs mb-8">
              Changed your mind? You can re-subscribe anytime from our homepage.
            </p>
            <Button
              size="lg"
              className="bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-8 font-bold text-sm uppercase tracking-wider"
              asChild
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.10] flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-7 w-7 text-white/40" />
            </div>
            <h1 className="text-white font-black text-2xl mb-3">Link not valid</h1>
            <p className="text-white/45 text-sm mb-8">{message}</p>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 text-white/60 hover:text-white rounded-full px-8 font-bold text-sm uppercase tracking-wider bg-transparent hover:bg-white/[0.05]"
              asChild
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </>
        )}

      </div>
    </div>
  );
};
