import { announcement } from "./documents/announcement";
import { galleryItem } from "./documents/galleryItem";
import { partner } from "./documents/partner";
import { post } from "./documents/post";
import { product } from "./documents/product";
import { service } from "./documents/service";
import { siteSettings } from "./documents/siteSettings";
import { blockContent } from "./objects/blockContent";
import { seo } from "./objects/seo";

export const schemaTypes = [
  siteSettings,
  service,
  post,
  galleryItem,
  announcement,
  partner,
  product,
  blockContent,
  seo,
];

/** Document types that exist exactly once. */
export const SINGLETONS = new Set(["siteSettings"]);
