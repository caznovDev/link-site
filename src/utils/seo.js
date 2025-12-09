
export function buildMeta({ title, description, image, url }) {
  document.title = title || "SFW Hub";

  const metaData = {
    description,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "og:url": url,
    "twitter:card": "summary_large_image"
  };

  for (const key in metaData) {
    let tag = document.querySelector(`meta[name='${key}']`) || document.createElement("meta");
    tag.setAttribute("name", key);
    tag.setAttribute("content", metaData[key]);
    document.head.appendChild(tag);
  }
}
