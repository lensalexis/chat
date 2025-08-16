// src/app/(landing)/case-studies/page.tsx
import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, landing } from "@/resources";
import { getPosts } from "@/utils/utils";
import { BlogClient } from "../blog/client"; // re-use the same client UI

export async function generateMetadata() {
  return Meta.generate({
    // If you already added landing.caseStudies in resources, swap to it.
    title: landing.blog.title?.replace(/blog/i, "Case Studies") || "Case Studies",
    description:
      landing.blog.description?.replace(/blog/i, "case studies") ||
      "Real projects, real results — our case studies.",
    baseURL,
    image: landing.blog.image,
    // prefer a dedicated path if you’ve added one; otherwise hardcode:
    path: "/case-studies",
  });
}

export default async function CaseStudies() {
  // IMPORTANT: point to case-studies content folder
  const allPosts = await getPosts(["src", "content", "case-studies"]);
  const totalPosts = allPosts.length;

  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Case Studies"
        description="Real projects, real results."
        path="/case-studies"
      />
      {/* Reuse BlogClient to render the grid/cards */}
      <BlogClient totalPosts={totalPosts} posts={allPosts} />
    </>
  );
}