import { Facebook, Smartphone } from 'lucide-react';
import { useSettings } from '../../lib/contentStore';

interface SocialLinksProps {
  variant?: 'light' | 'dark';
}

export default function SocialLinks({ variant = 'light' }: SocialLinksProps) {
  const { facebookUrl, intramurosUrl } = useSettings();
  const base = 'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors';
  const style = variant === 'dark'
    ? `${base} bg-white/10 text-white hover:bg-white/20`
    : `${base} bg-blue-50 text-blue-700 hover:bg-blue-100`;

  return (
    <div className="flex flex-wrap gap-2" aria-label="Réseaux sociaux de la commune">
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={style}>
        <Facebook size={16} aria-hidden="true" />
        Facebook
      </a>
      <a href={intramurosUrl} target="_blank" rel="noopener noreferrer" className={style}>
        <Smartphone size={16} aria-hidden="true" />
        IntraMuros
      </a>
    </div>
  );
}
