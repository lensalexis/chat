"use client";

import { useState } from "react";
import { Column, Heading, Row, IconButton, Particle, Background, Button, Grid } from "@once-ui-system/core";
import { PostsClient } from "@/app/(landing)/components";
import { social } from "@/resources";
import { Newsletter } from "../components/Newsletter";

export function BlogClient({ totalPosts, posts }: { totalPosts: number, posts: any[] }) {
  const [postsToShow, setPostsToShow] = useState(9);
  
  const handleShowMore = () => {
    setPostsToShow(prev => Math.min(prev + 9, totalPosts));
  };

  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingY="xl">
      <Row fillWidth horizontal="center" paddingX="12">
        <Row maxWidth="l" paddingX="l" paddingBottom="16" horizontal="between" vertical="center">
          <Heading variant="heading-strong-l">
            Blog
          </Heading>
          <Row gap="8">
          {social.map((item) => (
            <IconButton
              key={item.name}
              href={item.link}
              icon={item.icon}
              size="s"
              variant="secondary"
            />
          ))}
          </Row>
        </Row>
      </Row>
      <Column fillWidth horizontal="center">
        <Row maxWidth="l" horizontal="center" radius="l" overflow="hidden">
          <PostsClient posts={posts} range={[1,1]} thumbnail direction="row" minHeight={24}/>
        </Row>
        <Row fillWidth horizontal="center" paddingX="12">
          <Column maxWidth="m" padding="l" gap="24" horizontal="center">
            <Grid fillWidth columns="2" s={{columns: 1}} gap="16">
              <PostsClient direction="column" posts={posts} range={[2, 3]} thumbnail/>
            </Grid>
            <Newsletter/>
            <Grid fillWidth columns="2" s={{columns: 1}} gap="16">
              <PostsClient direction="column" posts={posts} range={[4, Math.min(postsToShow, totalPosts)]} thumbnail/>
            </Grid>
            {postsToShow < totalPosts && (
              <Row maxWidth="xs">
                <Button 
                  fillWidth 
                  variant="secondary" 
                  data-border="rounded"
                  onClick={handleShowMore}
                >
                  Show more
                </Button>
              </Row>
            )}
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
