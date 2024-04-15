import { load } from "ts-dotenv";

export default load({
  NODE_ENV: { type: String, optional: true, default: "development" },
  SERVER_HOST: { type: String, optional: true, default: "localhost" },
  SERVER_PORT: { type: Number, optional: true, default: 4000 },
  DB_FILE: { type: String, optional: true, default: "./db.ts" },
});
