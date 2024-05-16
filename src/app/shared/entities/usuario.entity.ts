import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  count!: number;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.count = 1;
  }
}
