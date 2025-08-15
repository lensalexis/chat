"use client";

import { AvatarGroup, Card, Column, Heading, Media, Row, SmartLink, Text } from '@once-ui-system/core';
import { formatDate } from '@/utils';

interface PostProps extends React.ComponentProps<typeof Card> {
    post: any;
    thumbnail: boolean;
}

export function Post({ post, thumbnail, ...card }: PostProps) {
    const avatars =
        post.metadata.team?.map((person: any) => ({
          src: person.avatar,
        })) || [];

    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)', background: 'var(--page-background)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Card
                transition="micro-medium"
                radius="l"
                s={{direction: "column"}}
                gap={card.direction === "column" ? undefined : "m"}
                padding={card.direction === "column" ? undefined : "8"}
                background="transparent"
                border="neutral-alpha-weak"
                fillWidth
                {...card}>
                {card.direction === "column" && (
                    <Row gap="16" vertical="center" paddingX="l" paddingY="20">
                        {avatars.length > 0 && <AvatarGroup reverse size="s" avatars={avatars} limit={2} />}
                        {post.metadata.team?.length > 0 && (
                            <Row fillWidth textVariant="label-default-m" onBackground="neutral-medium">
                                {
                                    post.metadata.team.length <= 2 ? 
                                    post.metadata.team.map((person: any) => person.name).join(" and ") :
                                    post.metadata.team.map((person: any) => person.name).slice(0, 2).join(", ") + " + " + (post.metadata.team.length - 2) + " more"
                                }
                            </Row>
                        )}
                        { post.metadata.tag &&
                            <Text wrap="nowrap" variant="label-default-s" onBackground="brand-medium">
                                {post.metadata.tag}
                            </Text>
                        }
                    </Row>
                )}
                {post.metadata.image && thumbnail && (
                    <Media
                        priority
                        sizes="(max-width: 768px) 100vw, 640px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius={card.direction === "column" ? "l" : "m"}
                        src={post.metadata.image}
                        alt={'Thumbnail of ' + post.metadata.title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Column
                    maxWidth={26}
                    padding="l"
                    flex={card.direction === "column" ? 1 : undefined}
                    vertical="center">
                    { post.metadata.tag && card.direction !== "column" &&
                        <Text wrap="nowrap" variant="label-default-s" onBackground="brand-medium">
                            {post.metadata.tag}
                        </Text>
                    }
                    <Heading
                        as="h2"
                        variant="heading-strong-xl"
                        wrap="balance"
                        marginBottom="8"
                        marginTop="8">
                        {post.metadata.title}
                    </Heading>
                    {card.direction === "column" ? (
                        <Row flex={1} vertical="end"
                            textVariant="body-default-xs"
                            onBackground="neutral-weak">
                            {formatDate(post.metadata.publishedAt, false)}
                        </Row>
                    ) : (avatars.length > 0 && (
                        <Row marginTop="32" gap="16" vertical="center">
                            <AvatarGroup reverse size="s" avatars={avatars} limit={2} />
                            <Column fillWidth>
                                <Row fillWidth textVariant="label-default-m" onBackground="neutral-medium">
                                    {post.metadata.team?.length > 0 && (
                                        post.metadata.team.length <= 2 ? 
                                        post.metadata.team.map((person: any) => person.name).join(" and ") :
                                        post.metadata.team.map((person: any) => person.name).slice(0, 2).join(", ") + " + " + (post.metadata.team.length - 2) + " more"
                                    )}
                                </Row>
                                <Text
                                    variant="body-default-xs"
                                    onBackground="neutral-weak">
                                    {formatDate(post.metadata.publishedAt, false)}
                                </Text>
                            </Column>
                        </Row>
                    ))}
                </Column>
            </Card>
        </SmartLink>
    );
}