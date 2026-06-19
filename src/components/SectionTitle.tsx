interface SectionTitleProps {
  id?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ id, title, subtitle, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 id={id} className={`text-2xl md:text-3xl font-bold mb-2 ${light ? 'text-white' : 'text-blue-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base ${light ? 'text-blue-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-3 h-1 w-12 rounded-full ${centered ? 'mx-auto' : ''} ${light ? 'bg-blue-300' : 'bg-blue-600'}`} aria-hidden="true" />
    </div>
  );
}
