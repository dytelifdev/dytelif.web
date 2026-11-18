import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "vuzgi5tw",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Hosted at https://dytelifsudeozkan.sanity.studio (first deployed 2026-11-19).
  deployment: {
    appId: "ppa65s6tdbgi1m1cr7szzmad",
    autoUpdates: true,
  },
  typegen: {
    path: "../web/src/**/*.{ts,tsx}",
    schema: "../web/src/sanity/schema.json",
    generates: "../web/src/sanity/types.ts",
    overloadClientMethods: true,
  },
});
