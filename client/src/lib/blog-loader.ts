import fm from 'front-matter';

interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  continent?: string;
}

export async function getBlogs() {
  try {
    // Relative path from client/src/lib to root content folder
    const modules = import.meta.glob('../../../content/blogs/*.md', { 
      query: '?raw', 
      eager: true 
    });

    const filePaths = Object.keys(modules);
    
    if (filePaths.length === 0) {
      console.warn("Vite glob didn't find any files. Check path: ../../../content/blogs/*.md");
      return [];
    }

    const posts = filePaths.map((filePath) => {
      const slug = filePath.split('/').pop()?.replace('.md', '') || '';
      
      // Vite eager raw imports usually put the content in the .default property
      const rawContent = (modules[filePath] as any).default || modules[filePath];
      
      // Use front-matter to parse
      const parsed = fm<BlogFrontmatter>(rawContent);
      const data = parsed.attributes;

      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || new Date().toISOString(),
        category: data.category || "Travel",
        image: data.image || "",
        description: data.description || "",
        continent: data.continent || "",
      };
    });

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  } catch (error) {
    console.error("Error loading blogs:", error);
    return [];
  }
}