type TagColorConfig = {
  bg: string;
  text: string;
  border: string;
};

type TagColors = {
  [key: string]: TagColorConfig;
};

export const tagColors: TagColors = {
  'JavaScript': {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border border-yellow-200 dark:border-yellow-800'
  },
  'TypeScript': {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border border-blue-200 dark:border-blue-800'
  },
  'Python': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
    border: 'border border-green-200 dark:border-green-800'
  },
  'Java': {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-800 dark:text-orange-300',
    border: 'border border-orange-200 dark:border-orange-800'
  },
  'Ruby': {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-300',
    border: 'border border-red-200 dark:border-red-800'
  },
  'PHP': {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-800 dark:text-purple-300',
    border: 'border border-purple-200 dark:border-purple-800'
  },
  'Go': {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-800 dark:text-cyan-300',
    border: 'border border-cyan-200 dark:border-cyan-800'
  },
  'Rust': {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border border-amber-200 dark:border-amber-800'
  },
  'C++': {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-800 dark:text-pink-300',
    border: 'border border-pink-200 dark:border-pink-800'
  },
  'C#': {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-800 dark:text-violet-300',
    border: 'border border-violet-200 dark:border-violet-800'
  },
  'React': {
    bg: 'bg-sky-100 dark:bg-sky-900/30',
    text: 'text-sky-800 dark:text-sky-300',
    border: 'border border-sky-200 dark:border-sky-800'
  },
  'Next.js': {
    bg: 'bg-neutral-100 dark:bg-neutral-900/30',
    text: 'text-neutral-800 dark:text-neutral-300',
    border: 'border border-neutral-200 dark:border-neutral-800'
  }
};

export function getTagColors(tag: string): TagColorConfig {
  // タグ名を正規化（大文字小文字を無視）して検索
  const normalizedTag = tag.toLowerCase();
  const matchedTag = Object.keys(tagColors).find(
    key => key.toLowerCase() === normalizedTag
  );

  // マッチするタグが見つかった場合はその色を返す
  if (matchedTag) {
    return tagColors[matchedTag];
  }

  // マッチしない場合はデフォルトの色を返す
  return {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border border-gray-200 dark:border-gray-700'
  };
} 