import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  continent?: string;
}

interface BlogCardProps {
  post: BlogCardPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <a href={`/blog/${post.slug}`}>
      <Card className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block overflow-hidden group cursor-pointer border-none h-full">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-[10px] text-gray-400">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
        </div>
      </Card>
    </a>
  );
}
