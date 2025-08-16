import { getPosts } from '@/utils/utils';
import { Post } from '@/app/(landing)/components';
import { Card } from '@once-ui-system/core';

interface PostsProps extends React.ComponentProps<typeof Card> {
  range?: [number] | [number, number];
  thumbnail?: boolean;
  basePath?: string;   // NEW → "/blog" (default) or "/case-studies"
  source?: string;     // NEW → folder name, e.g. "blog" or "case-studies"
}

export async function Posts({
  range,
  thumbnail = true,
  basePath = '/blog',          // default
  source = 'blog',             // default
  ...card
}: PostsProps) {
  // 🔑 Now can pull from blog or case-studies folder
  let allPosts = await getPosts(["src", "content", source]);

  const sortedPosts = allPosts.sort((a: any, b: any) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedPosts = range
    ? sortedPosts.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : sortedPosts.length
      )
    : sortedPosts;

  return (
    <>
      {displayedPosts.length > 0 &&
        displayedPosts.map((post: any) => (
          <Post
            key={post.slug}
            post={post}
            thumbnail={thumbnail}
            basePath={basePath}   // pass along to Post
            {...card}
          />
        ))}
    </>
  );
}