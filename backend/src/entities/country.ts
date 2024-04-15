import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  emoji: string;
}

@InputType()
export class NewCountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  emoji: string;
}
