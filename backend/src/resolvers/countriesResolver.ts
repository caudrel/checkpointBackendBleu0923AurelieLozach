import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { GraphQLError } from "graphql";
import { Country, NewCountryInput } from "../entities/country";
import { validate } from "class-validator";
import { DeepPartial } from "typeorm";

@Resolver(Country)
class CountriesResolver {
  @Query(() => [Country])
  async countries() {
    return await Country.find();
  }

  @Query(() => Country)
  async country(@Arg("countryCode", () => String) countryCode: string) {
    try {
      const country = await Country.findOne({ where: { countryCode } });
      return country;
    } catch (error) {
      console.error("Erreur lors de la recherche du pays :", error);
      return null;
    }
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continentCode", () => String) continentCode: string) {
    try {
      const countries = await Country.find({ where: { continentCode } });
      return countries;
    } catch (error) {
      console.error("Erreur lors de la recherche des pays par continent :", error);
      return [];
    }
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data") data: NewCountryInput): Promise<Country> {
    const newCountryData = this.createNewCountryData(data); // Convertit NewCountryInput en DeepPartial<Country>
    const newCountry = Country.create(newCountryData); // Crée une nouvelle instance de Country à partir des données converties
    const errors = await validate(newCountry); // Valide la nouvelle instance de Country
    if (errors.length > 0) {
      // S'il y a des erreurs de validation, lance une GraphQLError avec les erreurs
      throw new GraphQLError(errors.toString());
    }
    // Si la validation réussit, sauvegarde la nouvelle instance de Country en base de données et la renvoie
    return await newCountry.save();
  }

  private createNewCountryData(data: NewCountryInput): DeepPartial<Country> {
    return {
      name: data.name,
      countryCode: data.countryCode,
      emoji: data.emoji,
      continentCode: data.continentCode,
    };
  }
}

export default CountriesResolver;
