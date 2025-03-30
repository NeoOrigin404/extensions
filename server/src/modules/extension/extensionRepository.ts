import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Extension = {
  id: number;
  logo: string;
  name: string;
  description: string;
  is_premium?: boolean;
  is_active?: boolean;
};

class ExtensionRepository {
  async create(extension: Omit<Extension, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO extension (logo, name, description) VALUES (?, ?, ?)",
      [extension.logo, extension.name, extension.description],
    );

    return result.insertId;
  }

  async read(id: number): Promise<Extension> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT logo, name, description, is_premium, is_active FROM extension WHERE id = ?",
      [id],
    );

    return rows[0] as Extension;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * FROM extension");
    return rows as Extension[];
  }

  async update(extension: Extension) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE extension SET logo = ?, name = ?, description = ?, is_premium = ?, is_active = ? WHERE id = ?",
      [
        extension.logo,
        extension.name,
        extension.description,
        extension.is_premium,
        extension.is_active,
        extension.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM extension WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ExtensionRepository();
