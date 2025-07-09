import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar } from "lucide-react";
import { format } from "date-fns";
import RecommendedCategoriesSidebar from "@/components/blog/recommended-categories-sidebar";

interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  post: string;
  author: string;
  cover_image: string;
  read_time: string;
  created_at: string;
  updated_at: string;
}

export const metadata: Metadata = {
  title: "Blog - ColorMyPage",
  description: "Read our latest blog posts about coloring pages, creativity, and more.",
  openGraph: {
    title: "Blog - ColorMyPage",
    description: "Read our latest blog posts about coloring pages, creativity, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - ColorMyPage",
    description: "Read our latest blog posts about coloring pages, creativity, and more.",
  },
};

export default async function BlogsPage() {
  const supabase = await createClient();

  const { data: blogs, error } = await supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading blog posts</p>
      </div>
    );
  }

  const blogPosts = blogs as BlogPost[];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover articles about coloring pages, creativity, and artistic inspiration
          </p>
        </header>

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts found. Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="grid gap-8 md:grid-cols-4">
                {blogPosts.map((blog) => (
                  <article key={blog.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Link href={`/blog/${blog.id}`} className="block">
                      {blog.cover_image && (
                        <div className="relative w-full h-48 md:h-56">
                          <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <header className="mb-4">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {blog.title}
                          </h2>
                          
                          {blog.subtitle && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3">
                              {blog.subtitle}
                            </p>
                          )}
                        </header>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{blog.author}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                            <span>
                              {format(new Date(blog.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{blog.read_time} min read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
            
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-8">
                <RecommendedCategoriesSidebar />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}