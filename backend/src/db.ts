import { DataSource } from "typeorm";
import { Country } from "./entities/country";
import env from "./env";
import * as dotenv from "dotenv";
dotenv.config();

// export default new DataSource({
//   type: "sqlite",
//   database: "geography.sqlite",
//   entities: ["src/entities/*.ts"],
//   synchronize: true,
//   logging: true,
// });

const db = new DataSource({
  type: "sqlite",
  database: "geography.sqlite",
  entities: [Country],
  synchronize: true,
  logging: env.NODE_ENV !== "test",
});

export async function clearDB() {
  const runner = db.createQueryRunner();

  // Désactiver temporairement les contraintes de clé étrangère pour pouvoir supprimer les tables sans problème
  await runner.query("PRAGMA foreign_keys=OFF");

  await Promise.all(
    db.entityMetadatas.map(async (entity) => {
      // Supprimer les contraintes de clé étrangère
      await runner.query(`PRAGMA foreign_key_list("${entity.tableName}")`).then(async (response: any[]) => {
        for (const constraint of response) {
          await runner.query(`PRAGMA foreign_keys = OFF;`);
          await runner.query(`DROP TABLE IF EXISTS "${constraint.table}";`);
        }
      });

      // Supprimer la table
      await runner.query(`DROP TABLE IF EXISTS "${entity.tableName}"`);
    })
  );

  // Réactiver les contraintes de clé étrangère
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

export default db;
