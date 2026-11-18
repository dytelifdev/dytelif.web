import { defineQuery } from "groq";

// Image projection: asset id + metadata for sizing and the blur placeholder.
const IMAGE = /* groq */ `{
  alt,
  crop,
  hotspot,
  asset->{ _id, metadata { lqip, dimensions { width, height } } }
}`;

const PUBLISHED = /* groq */ `defined(slug.current) && (!defined(publishedAt) || publishedAt <= now())`;

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  title,
  description,
  ogImage${IMAGE},
  heroHeadline,
  heroIntro,
  heroImage${IMAGE},
  aboutImage${IMAGE},
  aboutIntro,
  whatsapp,
  phoneDisplay,
  email,
  location,
  instagramUrl,
  xUrl,
  doktorTakvimiUrl,
  address { venue, street, postalCode, district, city },
  mapsUrl,
  privacyNotice,
  productsStatus,
  productsTitle,
  productsIntro,
  productsImage${IMAGE},
  productsSeo { title, description, image${IMAGE} }
}`);

export const SERVICES_QUERY = defineQuery(`*[_type == "service" && defined(slug.current)]
  | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    featured,
    image${IMAGE}
  }`);

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  image${IMAGE},
  body,
  seo { title, description, image${IMAGE} }
}`);

export const POSTS_QUERY = defineQuery(`*[_type == "post" && ${PUBLISHED}]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage${IMAGE}
  }`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug && ${PUBLISHED}][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  coverImage${IMAGE},
  body,
  seo { title, description, image${IMAGE} },
  "related": *[_type == "post" && slug.current != ^.slug.current && ${PUBLISHED}]
    | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      publishedAt
    }
}`);

export const GALLERY_QUERY = defineQuery(`*[_type == "galleryItem" && defined(image.asset)]
  | order(order asc, _createdAt desc) {
    _id,
    caption,
    category,
    image${IMAGE}
  }`);

export const ANNOUNCEMENTS_QUERY = defineQuery(`*[_type == "announcement" && ${PUBLISHED}]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    image${IMAGE}
  }`);

export const ANNOUNCEMENT_QUERY = defineQuery(`*[_type == "announcement" && slug.current == $slug && ${PUBLISHED}][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  _updatedAt,
  image${IMAGE},
  body,
  seo { title, description, image${IMAGE} }
}`);

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && defined(slug.current)]
  | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    image${IMAGE}
  }`);

export const PARTNERS_QUERY = defineQuery(`*[_type == "partner" && defined(name)]
  | order(order asc, name asc) {
    _id,
    name,
    category,
    area,
    instagram,
    logo${IMAGE}
  }`);

export const SITEMAP_QUERY = defineQuery(`{
  "services": *[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "posts": *[_type == "post" && ${PUBLISHED}]{ "slug": slug.current, _updatedAt },
  "announcements": *[_type == "announcement" && ${PUBLISHED}]{ "slug": slug.current, _updatedAt }
}`);
