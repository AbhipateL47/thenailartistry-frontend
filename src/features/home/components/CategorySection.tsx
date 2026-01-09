import { Link } from 'react-router-dom';

interface Category {
  name: string;
  image: string;
  href: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Occasion</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-pink transition-all animate-scale-in"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

