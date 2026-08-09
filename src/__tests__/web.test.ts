
import { describe, it, expect } from "vitest";
import { parseSitemapUrls, isSitemapIndex } from "../web.ts";

describe("parseSitemapUrls", () => {
  it("parses a simple sitemap with loc and lastmod", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/news/article-1</loc>
    <lastmod>2026-08-09</lastmod>
  </url>
  <url>
    <loc>https://example.com/research/paper-1</loc>
    <lastmod>2026-08-08</lastmod>
  </url>
</urlset>`;
    const results = parseSitemapUrls(xml);
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ loc: "https://example.com/news/article-1", lastmod: "2026-08-09" });
    expect(results[1]).toEqual({ loc: "https://example.com/research/paper-1", lastmod: "2026-08-08" });
  });

  it("parses a sitemap entry without lastmod", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page-no-lastmod</loc>
  </url>
</urlset>`;
    const results = parseSitemapUrls(xml);
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({ loc: "https://example.com/page-no-lastmod", lastmod: undefined });
  });

  it("returns empty array for empty sitemap", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    const results = parseSitemapUrls(xml);
    expect(results).toHaveLength(0);
  });

  it("returns empty array for non-sitemap xml", () => {
    const xml = `<root><item>test</item></root>`;
    const results = parseSitemapUrls(xml);
    expect(results).toHaveLength(0);
  });

  it("handles multiple urls correctly", () => {
    const xml = `<urlset>
  <url><loc>https://a.com/1</loc><lastmod>2026-01-01</lastmod></url>
  <url><loc>https://a.com/2</loc><lastmod>2026-01-02</lastmod></url>
  <url><loc>https://a.com/3</loc></url>
</urlset>`;
    const results = parseSitemapUrls(xml);
    expect(results).toHaveLength(3);
    expect(results[2].lastmod).toBeUndefined();
  });
});

describe("isSitemapIndex", () => {
  it("returns true for a sitemap index document", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-news.xml</loc>
  </sitemap>
</sitemapindex>`;
    expect(isSitemapIndex(xml)).toBe(true);
  });

  it("returns false for a regular urlset sitemap", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
  </url>
</urlset>`;
    expect(isSitemapIndex(xml)).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isSitemapIndex("")).toBe(false);
  });

  it("returns true for sitemapindex with attributes", () => {
    const xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" version="1.0">
</sitemapindex>`;
    expect(isSitemapIndex(xml)).toBe(true);
  });
});
