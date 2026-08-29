import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

const environment = process.env.NODE_ENV || "development";

if (environment !== "production") {
  dotenv.config({
    path: `.env.${environment}.local`,
  });
}

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: process.env.DATABASE_URL!,
  },
});