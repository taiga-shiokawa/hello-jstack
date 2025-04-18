import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID is not defined');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  lastEditedAt: string;
  summary: string;
  coverImage?: string;
  tags: string[];
  content: string;
  readTime: number;
}

const getPropertyValue = <T extends string | string[]>(
  pageObject: PageObjectResponse,
  propertyName: string,
  type: 'title' | 'rich_text' | 'date' | 'multi_select'
): T => {
  const property = pageObject.properties[propertyName];
  
  if (!property) {
    // プロパティが存在しない場合は、型に応じてデフォルト値を返す
    if (type === 'multi_select') {
      return ([] as string[]) as T;
    }
    return '' as T;
  }

  switch (type) {
    case 'title':
      return (property.type === 'title' ? property.title[0]?.plain_text ?? '' : '') as T;
    case 'rich_text':
      return (property.type === 'rich_text' ? property.rich_text[0]?.plain_text ?? '' : '') as T;
    case 'date': {
      if (property.type === 'date' && property.date?.start) {
        // Notionから返される日付文字列をDateオブジェクトに変換し、ISOStringに整形
        const date = new Date(property.date.start);
        return date.toISOString() as T;
      }
      return '' as T;
    }
    case 'multi_select':
      return (property.type === 'multi_select' ? property.multi_select.map(item => item.name) : []) as T;
    default:
      return '' as T;
  }
};

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  const posts = await Promise.all(
    database.results.map(async (page) => {
      const pageObject = page as PageObjectResponse;
      const mdBlocks = await n2m.pageToMarkdown(pageObject.id);
      const mdString = n2m.toMarkdownString(mdBlocks);
      
      const post: BlogPost = {
        id: pageObject.id,
        title: getPropertyValue<string>(pageObject, 'Title', 'title'),
        slug: getPropertyValue<string>(pageObject, 'Slug', 'rich_text'),
        publishedAt: getPropertyValue<string>(pageObject, 'Date', 'date') || new Date().toISOString(),
        lastEditedAt: new Date(pageObject.last_edited_time).toISOString(),
        summary: getPropertyValue<string>(pageObject, 'Summary', 'rich_text'),
        coverImage: pageObject.cover?.type === 'external' ? pageObject.cover.external.url : pageObject.cover?.type === 'file' ? pageObject.cover.file.url : undefined,
        tags: getPropertyValue<string[]>(pageObject, 'Tags', 'multi_select'),
        content: mdString,
        readTime: Math.ceil(mdString.length / 1500),
      };

      return post;
    })
  );

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not defined');
  }

  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  if (!database.results[0]) {
    return null;
  }

  const pageObject = database.results[0] as PageObjectResponse;
  const mdBlocks = await n2m.pageToMarkdown(pageObject.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  const publishedDate = getPropertyValue<string>(pageObject, '公開日', 'date') || 
                       getPropertyValue<string>(pageObject, 'Date', 'date') || 
                       new Date(pageObject.created_time).toISOString();

  const post: BlogPost = {
    id: pageObject.id,
    title: getPropertyValue<string>(pageObject, 'Title', 'title'),
    slug: getPropertyValue<string>(pageObject, 'Slug', 'rich_text'),
    publishedAt: publishedDate,
    lastEditedAt: new Date(pageObject.last_edited_time).toISOString(),
    summary: getPropertyValue<string>(pageObject, 'Summary', 'rich_text'),
    coverImage: pageObject.cover?.type === 'external' ? pageObject.cover.external.url : pageObject.cover?.type === 'file' ? pageObject.cover.file.url : undefined,
    tags: getPropertyValue<string[]>(pageObject, 'Tags', 'multi_select'),
    content: mdString,
    readTime: Math.ceil(mdString.length / 1500),
  };

  return post;
} 