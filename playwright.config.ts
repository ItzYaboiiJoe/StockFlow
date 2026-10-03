import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { SITE_URL } from "@/lib/constants";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: SITE_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: SITE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
