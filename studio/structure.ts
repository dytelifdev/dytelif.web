import { CogIcon } from "@sanity/icons/Cog";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .title("Site ayarları")
        .id("siteSettings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site ayarları")),
      S.divider(),
      S.documentTypeListItem("service").title("Hizmetler"),
      S.documentTypeListItem("post").title("Blog yazıları"),
      S.documentTypeListItem("galleryItem").title("Galeri"),
      S.documentTypeListItem("announcement").title("Duyurular"),
      S.divider(),
      S.documentTypeListItem("product").title("Ürün tanıtımları"),
    ]);
