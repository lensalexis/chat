"use client";

import { Card } from '@once-ui-system/core';
import { Post } from '@/app/(landing)/components';

interface PostsClientProps extends React.ComponentProps<typeof Card> {
  posts: any[];
  range?: [number] | [number, number];
  thumbnail?: boolean;
  /** base path for links, e.g. "/blog" (default) or "/case-studies" */
  basePath?: string;
}

export function PostsClient({
  posts,
  range,
  thumbnail = true,
  basePath = '/blog',        // ← NEW: default stays /blog
  ...card
}: PostsClientProps) {
  const sortedBlogs = [...posts].sort((a: any, b: any) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : sortedBlogs.length 
      )
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && displayedBlogs.map((post: any) => (
        <Post
          key={post.slug}
          post={post}
          thumbnail={thumbnail}
          basePath={basePath}      // ← NEW: pass to Post
          {...card}
        />
      ))}
    </>
  );
}