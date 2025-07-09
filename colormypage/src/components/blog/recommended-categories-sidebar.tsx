import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function RecommendedCategoriesSidebar() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .limit(6);

    console.log("Recommended Categories:", categories);

  if (error || !categories) {
    return null;
  }

  return (
    <div className="w-full lg:max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
          Recommended Categories
        </h2>
        
        {/* Mobile: Horizontal scroll layout */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-shrink-0 group"
              >
                <div className="w-32 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {category.cover_image_url && (
                    <div className="relative w-full h-20 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={category.cover_image_url}
                        alt={decodeURI(category.title)}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="128px"
                      />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white text-xs leading-tight mb-1 line-clamp-2">
                      {decodeURI(category.title)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {category.image_count} pages
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Desktop: Vertical list layout */}
        <div className="hidden lg:block space-y-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="block group"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {category.cover_image_url && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={category.cover_image_url}
                      alt={decodeURI(category.title)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="48px"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {decodeURI(category.title)}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {category.image_count} coloring pages
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 lg:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/categories"
            className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
}