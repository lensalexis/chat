import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  HeadingNav,
  IconButton,
  Row,
  Text,
  Media,
} from "@once-ui-system/core";
import { CustomMDX } from "@/app/(landing)/components";
import { baseURL, landing } from "@/resources";
import { formatDate } from "@/utils";
import { getPosts } from "@/utils/utils";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts(["src", "content", "case-studies"]);
  return posts.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = await getPosts(["src", "content", "case-studies"]);
  const post = posts.find((p: any) => p.slug === slugPath);
  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    image:
      post.metadata.image ||
      `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
    path: `/case-studies/${post.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = await getPosts(["src", "content", "case-studies"]);
  const post = posts.find((p: any) => p.slug === slugPath);
  if (!post) notFound();

  const avatars =
    post.metadata.team?.map((person: any) => ({ src: person.avatar })) || [];

  return (
    <Row fillWidth paddingX="l" paddingY="xl">
      <Row maxWidth={14} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="s" gap="12">
          <Schema
            as="article"
            baseURL={baseURL}
            path={`/case-studies/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(
                post.metadata.title
              )}`
            }
            author={
              post.metadata.team && post.metadata.team.length > 0
                ? {
                    name: post.metadata.team[0].name,
                    url: `${baseURL}/case-studies`,
                    image: `${baseURL}${post.metadata.team[0].avatar}`,
                  }
                : undefined
            }
          />

          <Text
            marginLeft="48"
            variant="body-default-xs"
            onBackground="neutral-weak"
          >
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>

          <Row fillWidth gap="8">
            <Row paddingY="4">
              <IconButton
                data-border="rounded"
                href="/case-studies"
                variant="tertiary"
                size="l"
                icon="chevronLeft"
              />
            </Row>
            <Heading variant="display-strong-s">{post.metadata.title}</Heading>
          </Row>

          <Row
            gap="16"
            vertical="center"
            marginLeft="48"
            marginBottom="20"
            marginTop="8"
          >
            {avatars.length > 0 && (
              <AvatarGroup reverse size="s" avatars={avatars} limit={2} />
            )}
            <Text variant="label-default-m" onBackground="neutral-medium">
              {post.metadata.team?.length > 0 &&
                (post.metadata.team.length <= 2
                  ? post.metadata.team.map((p: any) => p.name).join(" and ")
                  : post.metadata.team
                      .map((p: any) => p.name)
                      .slice(0, 2)
                      .join(", ") +
                    " + " +
                    (post.metadata.team.length - 2) +
                    " more")}
            </Text>
          </Row>

          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}

          <Column as="article" fillWidth paddingX="m">
            <CustomMDX source={post.content} />
          </Column>
        </Column>
      </Row>

      <Column
        maxWidth={14}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="128"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}