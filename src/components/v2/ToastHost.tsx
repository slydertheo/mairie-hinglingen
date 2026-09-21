import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastMsg {
  id: number;
  type: 'success' | 'error';
  message: string;
}

let nextId = 1;

export default function ToastHost() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const onToast = (e: Event) => {
      const { type, message } = (e as CustomEvent<{ type: 'success' | 'error'; message: string }>).detail;
      const id = nextId++;
      setToasts(t => [...t, { id, type, message }]);
      window.setTimeout(() => {
        setToasts(t => t.filter(x => x.id !== id));
      }, type === 'error' ? 6000 : 3000);
    };
    window.addEventListener('admin-toast', onToast);
    return () => window.removeEventListener('admin-toast', onToast);
  }, []);

  const dismiss = (id: number) => setToasts(t => t.filter(x => x.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-start gap-2 rounded-xl shadow-lg px-4 py-3 text-sm text-white ${t.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {t.type === 'success' ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" /> : <XCircle size={18} className="flex-shrink-0 mt-0.5" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => dismiss(t.id)} aria-label="Fermer" className="flex-shrink-0 opacity-80 hover:opacity-100">
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
