import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { PersonSchema } from "@/components/seo/PersonSchema";

export default function Home() {
  return (
    <>
      <PersonSchema />
      <Hero />
      <FeaturedProjects />
      <LatestPosts />
      <CurrentlyBuilding />
    </>
  );
}
