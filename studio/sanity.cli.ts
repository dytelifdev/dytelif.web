import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "vuzgi5tw",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // The *.sanity.studio hostname is chosen by the client on first `pnpm deploy`.
  deployment: {
    autoUpdates: true,
  },
  typegen: {
    path: "../web/src/**/*.{ts,tsx}",
    schema: "../web/src/sanity/schema.json",
    generates: "../web/src/sanity/types.ts",
    overloadClientMethods: true,
  },
});
