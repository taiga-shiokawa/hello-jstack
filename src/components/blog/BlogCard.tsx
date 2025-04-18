'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { getTagColors } from '@/lib/utils/tag-colors';

interface BlogCardProps {
  title: string;
  summary: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  readTime: number;
  coverImage?: string;
}

export function BlogCard({
  title,
  summary,
  publishedAt,
  slug,
  tags,
  readTime,
  coverImage,
}: BlogCardProps) {
  return (
    <Card className="overflow-hidden group">
      {coverImage && (
        <div className="relative h-48">
          <Image
            src={coverImage}
            width={300}
            height={300}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <Link href={`/blog/${slug}`} className="block">
          <h2 className="text-xl font-semibold group-hover:text-blue-600">
            {title}
          </h2>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 mb-4 line-clamp-2">{summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => {
            const { bg, text, border } = getTagColors(tag);
            return (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${bg} ${text} ${border}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <time dateTime={publishedAt}>
            {format(new Date(publishedAt), 'yyyy年MM月dd日', { locale: ja })}
          </time>
          <span className="mx-2">•</span>
          <span>{readTime}分で読めます</span>
        </div>
      </CardContent>
    </Card>
  );
} 