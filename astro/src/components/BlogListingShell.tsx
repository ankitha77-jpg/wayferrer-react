import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogCard } from '@/components/BlogCard';
import { Search, Calendar } from 'lucide-react';
import { GradientText } from '@/components/ui/gradient-text';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  continent: string;
}

const CATEGORIES = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica', 'Travel Tips'];

export default function BlogListingShell({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === 'All' ||
        post.category === selectedCategory ||
        post.continent === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = filteredPosts[0];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>Travel Stories</GradientText> &amp; Guides
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Real adventures from offbeat destinations, practical travel tips, and everything you need to explore the world's hidden corners.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search stories, destinations, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className="text-sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredPost && !searchQuery && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <GradientText>Featured Story</GradientText>
              </h2>
            </div>
            <a href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer group border-none">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-primary text-white">{featuredPost.category}</Badge>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed line-clamp-3">{featuredPost.description}</p>
                    <Button size="lg" className="w-fit">Read Full Story</Button>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-10 bg-gradient-to-br from-orange-50 via-coral-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-lg text-gray-700">
                Found <span className="font-bold text-primary">{filteredPosts.length}</span> results for "{searchQuery}"
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No stories found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
