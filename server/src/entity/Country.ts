import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CountryInput {
  @Field()
  code: string;
  
  @Field()
  name: string;

  @Field()
  emoji: string;
}
@ObjectType()
@Entity()
class Country {
  @Field()
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  emoji: string;
}

export default Country;
