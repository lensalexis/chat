import { baseURL, product } from "@/resources";
import { Schema, Meta } from "@once-ui-system/core";
import SettingsClient from "./client";

export async function generateMetadata() {
  return Meta.generate({
    title: product.settings.title,
    description: product.settings.description,
    baseURL: baseURL,
    path: product.settings.path,
    canonical: product.settings.canonical,
    image: product.settings.image,
    robots: product.settings.robots,
    alternates: product.settings.alternates,
  });
}

export default function Settings() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={product.settings.title}
        description={product.settings.description}
        path={product.settings.path}
      />
      <SettingsClient/>
    </>
  );
}