import { Hero, Blog, Brands, Testimonial1 } from "@/app/(landing)/components";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, landing } from "@/resources";
// ⬇️ remove ChatClient import
// import ChatClient from "../(product)/chat/client";
import Services from '@/components/Services';

export async function generateMetadata() {
  return Meta.generate({
    title: landing.home.title,
    description: landing.home.description,
    baseURL: baseURL,
    path: landing.home.path,
    canonical: landing.home.canonical,
    image: landing.home.image,
    robots: landing.home.robots,
    alternates: landing.home.alternates,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={landing.home.title}
        description={landing.home.description}
        path={landing.home.path}
      />

      {/* Hero now includes the chat on the right */}
      <Hero maxWidth="xl" paddingX="l" />

      {/* Services just below hero */}
      <div id="services" />
      <Services paddingX="l" marginY="xl" />
      {/* Testimonials */}
      {/* Testimonials */}
<Testimonial1
  testimonials={[
    { content: <>“Placeholder testimonial 1.”</>, name: "Name 1", role: "Role 1", company: "Company 1", link: "#" },
    { content: <>“Placeholder testimonial 2.”</>, name: "Name 2", role: "Role 2", company: "Company 2", link: "#" },
    { content: <>“Placeholder testimonial 3.”</>, name: "Name 3", role: "Role 3", company: "Company 3", link: "#" },
    { content: <>“Placeholder testimonial 4.”</>, name: "Name 4", role: "Role 4", company: "Company 4", link: "#" },
    { content: <>“Placeholder testimonial 5.”</>, name: "Name 5", role: "Role 5", company: "Company 5", link: "#" },
    { content: <>“Placeholder testimonial 6.”</>, name: "Name 6", role: "Role 6", company: "Company 6", link: "#" },
  ]}
/>
      <Blog maxWidth="l" paddingX="l" marginY="xl"/>
      <Brands maxWidth="s"/>
    </Column>
  );
}