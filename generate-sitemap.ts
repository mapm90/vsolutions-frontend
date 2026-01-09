import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const baseUrl = "https://vdmm-services.vercel.app";

// Aquí pones todas tus rutas
const pages: string[] = [
  "/",
  "/servicios",
  "/tips",
  // Agrega más páginas si las tienes
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: baseUrl });

  pages.forEach((page) => {
    sitemap.write({ url: page, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  const sitemapData = await streamToPromise(sitemap);
  writeFileSync("public/sitemap.xml", sitemapData.toString());
  console.log("Sitemap generado en public/sitemap.xml ✅");
}

generateSitemap().catch((err) => {
  console.error("Error generando el sitemap:", err);
  process.exit(1);
});
