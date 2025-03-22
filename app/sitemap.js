export default function sitemap() {
  const baseUrl = "https://kulfi-ai.com"; 

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
  ];
}
