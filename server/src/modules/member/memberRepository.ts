import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Member = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  hashed_password?: string;
  premium?: boolean;
  role?: string;
};

class MemberRepository {
  async create(member: Omit<Member, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO member (first_name, last_name, username, email, hashed_password) VALUES (?, ?, ?, ?, ?)",
      [
        member.first_name,
        member.last_name,
        member.username,
        member.email,
        member.hashed_password,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT first_name, last_name, username, email, premium, role FROM member WHERE id = ?",
      [id],
    );

    return rows[0] as Member;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT *, first_name, last_name, username FROM member",
    );

    return rows as Member[];
  }

  async update(member: Member) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE member SET first_name = ?, last_name = ?, username = ?, email = ?, hashed_password = ?, premium = ?, role = ? WHERE id = ?",
      [
        member.first_name,
        member.last_name,
        member.username,
        member.email,
        member.hashed_password,
        member.premium,
        member.role,
        member.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM member WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new MemberRepository();
