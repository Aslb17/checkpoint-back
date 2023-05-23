import { Arg, Mutation, Query, Resolver } from "type-graphql";
import db from "../db";
import Country, { CountryInput } from "../entity/Country";

@Resolver()
export default class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    const countries = await db.getRepository(Country).find();

    return countries.map((c) => ({ ...c, emoji: c.emoji || "" }));
  }

  @Query(() => [Country])
  async countriesByCode(@Arg("code") code: string): Promise<Country[]> {
    const countries = await db
      .getRepository(Country)
      .find({ where: { code } });

    return countries.map((c) => ({ ...c, name: c.name, emoji: c.emoji || "" }));
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data") data: CountryInput): Promise<Country> {
    return await db.getRepository(Country).save(data);
  }
}
