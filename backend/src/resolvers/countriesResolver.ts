import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { GraphQLError } from "graphql";
import { Country, NewCountryInput } from "../entities/country";
import { validate } from "class-validator";

@Resolver(Country)
class CountriesResolver {
  @Query(() => [Country])
  async countries() {
    return await Country.find();
  }

  @Query(() => Country)
  async country(@Arg("code", () => String) code: string) {
    try {
      const country = await Country.findOne({ where: { code } });
      return country;
    } catch (error) {
      console.error("Erreur lors de la recherche du pays :", error);
      return null;
    }
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data", { validate: true }) data = NewCountryInput) {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    const errors = await validate(newCountry);
    if (errors.length > 0) {
      throw new GraphQLError(errors.toString());
    }
    const { id } = await newCountry.save();
    return Country.findOne({
      where: { id },
    });
  }
}

export default CountriesResolver;
