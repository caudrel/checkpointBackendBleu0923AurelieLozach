import db from "./db";
import { Country } from "./entities/country";
import { clearDB } from "../src/db";

export async function main() {
  await db.initialize();
  await clearDB();

  const france = Country.create({ name: "France", code: "FR", emoji: "🇫🇷" });
  const germany = Country.create({ name: "Germany", code: "DE", emoji: "🇩🇪" });
  const spain = Country.create({ name: "Spain", code: "ES", emoji: "🇪🇸" });
  const italy = Country.create({ name: "Italy", code: "IT", emoji: "🇮🇹" });
  const portugal = Country.create({ name: "Portugal", code: "PT", emoji: "🇵🇹" });
  const belgium = Country.create({ name: "Belgium", code: "BE", emoji: "🇧🇪" });

  await france.save();
  await germany.save();
  await spain.save();
  await italy.save();
  await portugal.save();
  await belgium.save();
}
