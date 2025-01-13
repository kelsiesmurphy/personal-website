import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("writing");
  return rss({
    title: "Kelsie Murphy | Software Engineer",
    description: "Kelsie Murphy's Personal Website",
    site: context.site,
    items: posts.filter((post) => post.data.published).map((post) => ({
      ...post.data,
      link: `/writing/${post.slug}/`,
    })),
  });
}
