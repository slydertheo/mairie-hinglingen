import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { fileToResizedDataUrl } from '../../lib/imageUpload';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageField({ label, value, onChange }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await fileToResizedDataUrl(file));
    } catch {
      alert('Impossible de charger cette image.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <label className="block text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        {value && (
          <img src={value} alt="" className="w-14 h-14 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
        )}
        <div className="flex-1 space-y-1.5 min-w-0">
          <input
            type="text"
            placeholder="URL de l'image, ou choisissez un fichier ci-dessous"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline disabled:opacity-50"
          >
            <Upload size={12} aria-hidden="true" />
            {busy ? 'Chargement…' : 'Choisir une photo depuis cet ordinateur'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />
        </div>
      </div>
    </label>
  );
}
