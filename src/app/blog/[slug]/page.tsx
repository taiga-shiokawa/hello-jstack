import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { getPostBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Markdown from "react-markdown";

export const revalidate = 3600; // 1時間ごとに再検証

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      <Link 
        href="/blog" 
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors container mx-auto px-4 py-8 max-w-4xl"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>記事一覧に戻る</span>
      </Link>

      <div className="container mx-auto px-4 max-w-4xl">
        {post.coverImage && (
          <div className="relative w-full h-[400px] mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), 'yyyy年MM月dd日', { locale: ja })}
          </time>
          <span>•</span>
          <span>{post.readTime}分で読めます</span>
        </div>

        <div className="flex gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>
      </div>
    </article>
  );
} 