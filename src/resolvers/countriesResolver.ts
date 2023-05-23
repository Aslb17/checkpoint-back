import { Query, Resolver } from "type-graphql";
import db from "../db";
import Country from "../entity/Country";


@Resolver()
export default class CountryResolver {
    @Query(() => [Country])
    async countries(): Promise<Country[]> {
      return await db.getRepository(Country).find();
    }
}