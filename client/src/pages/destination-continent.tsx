import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/blog-loader";
import { BlogCard } from "@/components/BlogCard";
import { Seo } from "@/components/Seo";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BASE_URL = "https://wayfarerfootprints.com";

interface ContinentMeta {
  label: string;
  continent: string;
  description: string;
  metaDescription: string;
  heroImage: string;
  emptyMessage: string;
}

const CONTINENTS: Record<string, ContinentMeta> = {
  asia: {
    label: "Asia",
    continent: "Asia",
    description:
      "From the Himalayas to ancient Silk Road cities, Southeast Asian islands to the Middle East's hidden gems — offbeat Asia travel guides written from the ground.",
    metaDescription:
      "Explore Wayfarer Footprints' Asia travel guides: Vietnam, Japan, Bhutan, Central Asia, the Middle East and beyond. Offbeat itineraries, honest tips, insider routes.",
    heroImage: "/images/destination-asia.jpg",
    emptyMessage: "Asia guides coming soon — check back shortly!",
  },
  africa: {
    label: "Africa",
    continent: "Africa",
    description:
      "Safari adventures, volcanic islands, ancient pyramids, and tribes off the beaten path — Africa is the continent that never stops surprising. Dive in.",
    metaDescription:
      "Discover Africa travel guides from Wayfarer Footprints: Kenya safaris, West Africa cultural trips, offbeat destinations across 30+ African countries.",
    heroImage: "/images/destination-africa.jpg",
    emptyMessage: "Africa guides coming soon — check back shortly!",
  },
  europe: {
    label: "Europe",
    continent: "Europe",
    description:
      "Skip the tourist trail. These Europe guides cover the Balkans, Scandinavia, the Caucasus, and every underrated corner that travellers fly over on their way to Paris.",
    metaDescription:
      "Read Wayfarer Footprints' Europe travel guides: Balkans itineraries, Scandinavia road trips, offbeat Eastern Europe destinations and hidden city gems.",
    heroImage: "/images/destination-europe.jpg",
    emptyMessage: "Europe guides coming soon — check back shortly!",
  },
  "north-america": {
    label: "North America",
    continent: "North America",
    description:
      "Central America's wild jungles, Caribbean coastlines, and under-the-radar countries that most travellers overlook — North America beyond the obvious.",
    metaDescription:
      "Wayfarer Footprints' North America travel guides: Costa Rica, Panama, Honduras and more. Itineraries for adventure travellers looking beyond the tourist trail.",
    heroImage: "/images/travel/world.jpg",
    emptyMessage: "North America guides coming soon — check back shortly!",
  },
  "south-america": {
    label: "South America",
    continent: "South America",
    description:
      "Ecuador's Andes, Colombia's waterfalls, Guyana's untouched rainforests — South America travel for those who want to go deeper than Machu Picchu.",
    metaDescription:
      "Explore South America with Wayfarer Footprints: Ecuador, Colombia, Guyana travel guides. Honest itineraries for offbeat South American adventures.",
    heroImage: "/images/travel/world.jpg",
    emptyMessage: "More South America guides coming soon — check back shortly!",
  },
  oceania: {
    label: "Australia & Oceania",
    continent: "Oceania",
    description:
      "New Zealand road trips, remote Pacific islands, and the vast landscapes of the southern hemisphere — Oceania's wildest corners, explored.",
    metaDescription:
      "Wayfarer Footprints' Oceania travel guides: New Zealand road trip itineraries and Pacific island adventures for curious, offbeat travellers.",
    heroImage: "/images/travel/world.jpg",
    emptyMessage: "More Oceania guides coming soon — check back shortly!",
  },
  antarctica: {
    label: "Antarctica",
    continent: "Antarctica",
    description:
      "The last frontier. An Antarctica cruise is unlike anything else on Earth — here's everything you need to know to plan your journey to the white continent.",
    metaDescription:
      "Planning an Antarctica trip? Read Wayfarer Footprints' Antarctica cruise guide — logistics, what to expect, and how to prepare for the seventh continent.",
    heroImage: "/images/travel/world.jpg",
    emptyMessage: "More Antarctica content coming soon — check back shortly!",
  },
};

export default function DestinationContinent() {
  const [, params] = useRoute("/destinations/:continent");
  const slug = params?.continent ?? "";
  const meta = CONTINENTS[slug];

  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ["local-blogs"],
    queryFn: getBlogs,
  });

  const posts = allPosts.filter(
    (p) => p.continent === (meta?.continent ?? "")
  );

  if (!meta) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold">Region not found</h1>
        <a href="/destinations" className="text-primary mt-4 inline-block hover:underline">
          ← Back to Destinations
        </a>
      </div>
    );
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `${BASE_URL}/destinations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.label,
        item: `${BASE_URL}/destinations/${slug}`,
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${meta.label} Travel Guides`,
    description: meta.metaDescription,
    url: `${BASE_URL}/destinations/${slug}`,
    isPartOf: { "@type": "WebSite", url: BASE_URL, name: "Wayfarer Footprints" },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
      image: p.image ? `${BASE_URL}${p.image}` : undefined,
      description: p.description,
    })),
  };

  return (
    <div className="pt-16">
      <Seo
        title={`${meta.label} Travel Guides & Itineraries`}
        description={meta.metaDescription}
        canonical={`/destinations/${slug}`}
        image={`${BASE_URL}${meta.heroImage}`}
        structuredData={[breadcrumbJsonLd, collectionPageJsonLd]}
      />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Visible breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="/">Home</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="/destinations">Destinations</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{meta.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <GradientText>{meta.label}</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {meta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">Plan a Custom Trip</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/destinations">All Destinations</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-rose-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
            </div>
          ) : posts.length > 0 ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {posts.length} {meta.label} {posts.length === 1 ? "Guide" : "Guides"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-6">🌍</p>
              <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
              <p className="text-gray-500 mb-8">{meta.emptyMessage}</p>
              <Button asChild>
                <a href="/destinations">Browse Other Regions</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Planning a trip to <GradientText>{meta.label}</GradientText>?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Every guide on this page comes from personal experience. Got questions or want a custom itinerary? Get in touch.
          </p>
          <Button size="lg" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
