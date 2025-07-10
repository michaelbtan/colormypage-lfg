import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
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

interface BlogPageProps {
  params: Promise<{ title: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { title: title } = await params;
  const supabase = await createClient();
  
  const { data: blog } = await supabase
    .from("blog")
    .select("title, subtitle, cover_image")
    .eq("title", title)
    .single();

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: decodeURI(blog.title),
    description: blog.subtitle || "Read this blog post on ColorMyPage",
    openGraph: {
    title: decodeURI(blog.title),
      description: blog.subtitle || "Read this blog post on ColorMyPage",
      images: blog.cover_image ? [blog.cover_image] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    title: decodeURI(blog.title),
      description: blog.subtitle || "Read this blog post on ColorMyPage",
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { title: title } = await params;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("blog")
    .select("*")
    .eq("title", title)
    .single();

  if (error || !blog) {
    notFound();
  }

  const blogPost = blog as BlogPost;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-4xl">
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {blogPost.cover_image && (
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src={blogPost.cover_image}
                    alt={decodeURI(blogPost.title)}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {decodeURI(blogPost.title)}
                  </h1>
                  
                  {blogPost.subtitle && (
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                      {blogPost.subtitle}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blogPost.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(blogPost.created_at), "MMMM d, yyyy")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blogPost.read_time} minutes</span>
                    </div>
                  </div>
                </header>

                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-code:text-primary prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-700">
                  <div
                    dangerouslySetInnerHTML={{ __html: blogPost.post }}
                  />
                </div>
              </div>
            </article>
          </div>
          
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <RecommendedCategoriesSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}