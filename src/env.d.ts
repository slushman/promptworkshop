/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  promptworkshop: D1Database;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
