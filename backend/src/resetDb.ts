import db from "./db";
import { Country } from "./entities/country";
import { clearDB } from "../src/db";

export async function main() {
  await db.initialize();
  await clearDB();

  const france = Country.create({ name: "France", countryCode: "FR", emoji: "🇫🇷", continentCode: "EU" });
  const germany = Country.create({ name: "Germany", countryCode: "DE", emoji: "🇩🇪", continentCode: "EU" });
  const spain = Country.create({ name: "Spain", countryCode: "ES", emoji: "🇪🇸", continentCode: "EU" });
  const italy = Country.create({ name: "Italy", countryCode: "IT", emoji: "🇮🇹", continentCode: "EU" });
  const portugal = Country.create({ name: "Portugal", countryCode: "PT", emoji: "🇵🇹", continentCode: "EU" });
  const belgium = Country.create({ name: "Belgium", countryCode: "BE", emoji: "🇧🇪", continentCode: "EU" });
  const brazil = Country.create({ name: "Brazil", countryCode: "BR", emoji: "🇧🇷", continentCode: "SA" });

  await france.save();
  await germany.save();
  await spain.save();
  await italy.save();
  await portugal.save();
  await belgium.save();
  await brazil.save();
}

main();
