import { trTRLocale } from "@sanity/locale-tr-tr";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { SINGLETONS, schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "vuzgi5tw";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Dyt. Elif Sude Özkan",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    trTRLocale(),
    // Query playground for development only; hidden in the deployed Studio.
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  document: {
    // Singletons can only be edited and published, never duplicated or deleted.
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({ action }) => action === "publish" || action === "discardChanges" || action === "restore")
        : actions,
  },
});
