import { getAllPosts } from '@/lib/notion';
import { BlogCard } from '@/components/blog/BlogCard';

export const revalidate = 3600; // 1時間ごとに再検証

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
    </div>
  );
} 