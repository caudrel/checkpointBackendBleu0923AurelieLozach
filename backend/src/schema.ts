import { buildSchema } from "type-graphql";
import CountriesResolver from "./resolvers/countriesResolver";

export default buildSchema({
  resolvers: [CountriesResolver],
});
