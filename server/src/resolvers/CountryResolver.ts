import { Arg, Mutation, Query, Resolver } from "type-graphql";
import db from "../db";
import Country, { CountryInput } from "../entity/Country";

@Resolver()
export default class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await db.getRepository(Country).find();
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data") data: CountryInput): Promise<Country> {
    return await db.getRepository(Country).save(data);
  }
}
