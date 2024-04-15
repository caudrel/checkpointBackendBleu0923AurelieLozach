import { load } from "ts-dotenv";

export default load({
  NODE_ENV: ["production" as const, "development" as const, "test" as const],
  SERVER_HOST: { type: String, optional: true, default: "localhost" },
  SERVER_PORT: { type: Number, optional: true, default: 4000 },
  DB_FILE: { type: String, optional: true, default: "./db.ts" },
});
