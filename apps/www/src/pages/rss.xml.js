import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const writing = await getCollection("writing");
  return rss({
    title: "Kelsie Murphy | Software Engineer",
    description: "Kelsie Murphy's Personal Website",
    site: context.site,
    trailingSlash: false,
    items: writing.filter((writingItem) => writingItem.data.published).map((writingItem) => ({
      link: `/writing/${writingItem.slug}/`,
      content: sanitizeHtml(parser.render(writingItem.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      ...writingItem.data,
    })),
  });
}
