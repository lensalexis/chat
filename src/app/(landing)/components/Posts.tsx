import { getPosts } from '@/utils/utils';
import { Post } from '@/app/(landing)/components';
import { Card } from '@once-ui-system/core';

interface PostsProps extends React.ComponentProps<typeof Card> {
    range?: [number] | [number, number];
    thumbnail?: boolean;
}

export async function Posts({
    range,
    thumbnail = true,
    ...card
}: PostsProps) {
    let allBlogs = await getPosts(["src", "content", "blog"]);

    const sortedBlogs = allBlogs.sort((a: any, b: any) => {
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
                    {...card}
                />
            ))}
        </>
    );
}