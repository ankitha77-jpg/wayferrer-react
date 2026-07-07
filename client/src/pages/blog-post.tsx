import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import fm from "front-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { Seo } from "@/components/Seo";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BASE_URL = "https://wayfarerfootprints.com";

const CONTINENT_SLUGS: Record<string, string> = {
  Africa: "africa",
  Europe: "europe",
  Asia: "asia",
  "North America": "north-america",
  "South America": "south-america",
  Oceania: "oceania",
  Antarctica: "antarctica",
};

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");

      // 1. Grab all markdown files available in the directory
      const modules = import.meta.glob("../../../content/blogs/*.md", {
        query: "?raw",
        eager: true,
      });

      // 2. Construct the specific key Vite uses (it matches the relative path)
      const targetPath = `../../../content/blogs/${slug}.md`;
      const rawFile = modules[targetPath];

      if (!rawFile) {
        console.error(
          "File not found in glob modules. Looked for:",
          targetPath,
        );
        throw new Error("Post not found");
      }

      // 3. Extract the text content correctly
      const rawContent = (rawFile as any).default || rawFile;

      // 4. Parse front-matter and convert Markdown body to HTML.
      //    The remark-rehype -> rehype-slug -> rehype-stringify chain replaces
      //    remark-html and adds an id="..." to every heading, so the in-page
      //    table-of-contents anchors (#where-we-stayed, #istanbul, etc.) resolve.
      const parsed = fm(rawContent);
      const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true }) // markdown AST -> HTML AST
        .use(rehypeSlug) // add id to each heading
        .use(rehypeStringify, { allowDangerousHtml: true }) // HTML AST -> string
        .process(parsed.body);

      return {
        metadata: parsed.attributes as any,
        content: processedContent.toString(),
      };
    },
    enabled: !!slug,
  });

  if (isLoading)
    return <div className="pt-32 text-center">Reading story...</div>;

  if (error || !post) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-2xl font-bold">Story not found.</h2>
        <p className="text-gray-500 mt-2">
          We couldn't find the adventure you're looking for.
        </p>
        <a
          href="/blog"
          className="text-primary mt-4 inline-block hover:underline"
        >
          Back to all blogs
        </a>
      </div>
    );
  }

  const continentSlug = post.metadata.continent
    ? CONTINENT_SLUGS[post.metadata.continent]
    : undefined;

  return (
    <article className="pt-24 pb-20 max-w-4xl mx-auto px-4">
      <Seo
        title={post.metadata.title}
        description={
          post.metadata.description ||
          `${post.metadata.title} — travel guide by Wayfarer Footprints.`
        }
        canonical={`/blog/${slug}`}
        image={
          post.metadata.image ? `${BASE_URL}${post.metadata.image}` : undefined
        }
        type="article"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL,
              },
              ...(continentSlug
                ? [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Destinations",
                      item: `${BASE_URL}/destinations`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: post.metadata.continent,
                      item: `${BASE_URL}/destinations/${continentSlug}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: post.metadata.title,
                      item: `${BASE_URL}/blog/${slug}`,
                    },
                  ]
                : [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Blog",
                      item: `${BASE_URL}/blog`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: post.metadata.title,
                      item: `${BASE_URL}/blog/${slug}`,
                    },
                  ]),
            ],
          },
        ]}
      />

      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><a href="/">Home</a></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {continentSlug ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><a href="/destinations">Destinations</a></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href={`/destinations/${continentSlug}`}>{post.metadata.continent}</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbLink asChild><a href="/blog">Blog</a></BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-xs">
              {post.metadata.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Blog Hero */}
      <div className="mb-10 text-center">
        <span className="text-primary font-bold uppercase tracking-wider text-sm">
          {post.metadata.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
          {post.metadata.title}
        </h1>
        <p className="text-gray-500">
          Published on {new Date(post.metadata.date).toLocaleDateString()}
        </p>
      </div>

      {post.metadata.image && (
        <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}
      {post.metadata.image && (
        <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Blog Content rendered with Tailwind Typography (prose).
          prose-headings:scroll-mt-24 offsets the jump target so anchored
          headings aren't hidden under the fixed header. */}
      <div
        className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-headings:scroll-mt-24 prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Back to continent link */}
      {continentSlug && (
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-3 text-sm">More from this region</p>
          <a
            href={`/destinations/${continentSlug}`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            ← Browse all {post.metadata.continent} guides
          </a>
        </div>
      )}
    </article>
  );
}
