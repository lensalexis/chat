import { Column, Heading, Text, Meta, Schema } from "@once-ui-system/core";
import { CustomMDX } from "@/app/(landing)/components/Mdx";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { baseURL, landing } from "@/resources";

async function getPrivacyPolicyContent() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'legal', 'privacy-policy.mdx');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    metadata: data,
    content: content
  };
}

export async function generateMetadata() {
  return Meta.generate({
  title: landing.privacy.title,
    description: landing.privacy.description,
    baseURL: baseURL,
    path: landing.privacy.path,
    canonical: landing.privacy.canonical,
    image: landing.privacy.image,
    robots: landing.privacy.robots,
    alternates: landing.privacy.alternates,
  });
}

export default async function PrivacyPolicy() {
  const { metadata, content } = await getPrivacyPolicyContent();
  
  return (
    <Column maxWidth="s" gap="l" paddingX="l" paddingY="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={metadata.title || landing.privacy.title}
        description={metadata.description || landing.privacy.description}
        path={landing.privacy.path}
      />
      <Column fillWidth gap="4">
        <Heading variant="display-strong-xs">
          {metadata.title}
        </Heading>
        <Text variant="label-default-s" onBackground="neutral-weak">
          Last updated: {metadata.updated}
        </Text>
      </Column>
      <Column fillWidth onBackground="neutral-medium">
        <CustomMDX source={content} />
      </Column>
    </Column>
  );
}
