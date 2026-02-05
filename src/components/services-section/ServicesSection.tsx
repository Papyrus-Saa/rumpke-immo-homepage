import { IoArrowForward } from 'react-icons/io5';
import Link from 'next/link';

const services = [
  {
    title: 'Verkaufen',
    text: 'Wir begleiten Sie professionell und transparent beim Verkauf Ihrer Immobilie.',
    link: '/dienstleistungen/verkauf-vermietung',
  },
  {
    title: 'Kaufen',
    text: 'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
    link: '/dienstleistungen/immobilien-kauf',
  },
  {
    title: 'Vermieten',
    text: 'Wir unterstützen Sie bei der erfolgreichen Vermietung Ihrer Immobilie.',
    link: '/dienstleistungen/immobilienbewertung',
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full mb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Unsere Leistungen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col items-center bg-secondary dark:bg-secondary-dark rounded-lg p-6 shadow-sm duration-100">
              <div className="font-semibold text-lg mb-2 ">{service.title}</div>
              <div className="text-sm text-center mb-4 text-card-text-l dark:text-card-text-d">{service.text}</div>
              <Link
                href={service.link}
                className="flex items-center justify-center w-9 h-9 rounded-full  text-white transition-colors mt-auto"
                aria-label={service.title}
              >
                <IoArrowForward size={18} className="text-primary cursor-pointer p-0 bg-transparent hover:scale-125 transition" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

