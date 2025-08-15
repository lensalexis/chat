import { Schema, Meta } from "@once-ui-system/core";
import ChatClient from "./client";
import { baseURL, product } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: product.chat.title,
    description: product.chat.description,
    baseURL: baseURL,
    path: product.chat.path,
    canonical: product.chat.canonical,
    image: product.chat.image,
    robots: product.chat.robots,
    alternates: product.chat.alternates,
  });
}

export default function Dashboard() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={product.chat.title}
        description={product.chat.description}
        path={product.chat.path}
      />
      <ChatClient />
    </>
  );
};