import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog/BlogCard"
import { getAllPosts } from "@/lib/notion"

export default async function BlogGridLayout() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">最新の記事</h2>
        </div>
        {posts.length > 6 &&
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/blog">
              すべての記事を見る <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            summary={post.summary}
            publishedAt={post.publishedAt}
            slug={post.slug}
            tags={post.tags}
            readTime={post.readTime}
            coverImage={post.coverImage}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Button variant="outline" asChild>
          <Link href="/blog">
            すべての記事を見る <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
