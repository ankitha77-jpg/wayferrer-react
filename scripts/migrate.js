import fs from "fs";
import path from "path";
import axios from "axios";

async function migrateEverything() {
  const outputDir = "./content/blogs";
  const imageDir = "./public/blog-images";
  const categoryMap = {
    "5b863b81abd5d1001436c1bd": "Europe",
    "5b84026300e3a700547612a0": "Africa",
    "5b84026300e3a7005476129f": "Asia", // Example ID
    "5b84026300e3a700547612a1": "Travel Tips", // Example ID
  };

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

  const url = "https://www.wayfarerfootprints.com/_functions/allBlogs";

  try {
    const response = await axios.get(url);
    const posts = response.data;

    for (const post of posts) {
      // SAFE SLUG GENERATION
      const slug = (post.postUri || post.title)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .trim();

      const imageUrl = post.coverImage;
      let localImagePath = "";

      if (imageUrl) {
        try {
          let webImageUrl = imageUrl.startsWith("wix:image")
            ? `https://static.wixstatic.com/media/${imageUrl.split("/")[3]}`
            : imageUrl;

          const imgName = `${slug}.jpg`;
          const fullPath = path.join(imageDir, imgName);

          const imgResponse = await axios({
            url: webImageUrl,
            responseType: "stream",
            timeout: 10000,
          });
          const writer = fs.createWriteStream(fullPath);
          imgResponse.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });

          localImagePath = `/blog-images/${imgName}`;
          console.log(`✅ Saved image: ${slug}`);
        } catch (err) {
          console.error(`⚠️ Image download failed for: ${slug}`);
        }
      }

      const categoryName = categoryMap[post.mainCategory] || "Travel Tips";

      const fileContent = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.publishedDate}"
category: "${categoryName}" 
image: "${localImagePath}"
description: "${post.excerpt ? post.excerpt.replace(/\n/g, " ").replace(/"/g, '\\"') : ""}"
---

${post.content || ""}`;

      // WRITE FILE
      const filePath = path.join(outputDir, `${slug}.md`);
      fs.writeFileSync(filePath, fileContent);
      console.log(`📄 Created blog file: ${slug}.md`);
    }
    console.log("\n🚀 Migration Successful!");
  } catch (error) {
    console.error("Migration error:", error.message);
  }
}

migrateEverything();
