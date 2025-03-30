import type { RequestHandler } from "express";
import memberRepository from "./memberRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const members = await memberRepository.readAll();
    res.json(members);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.query.id);

    if (!memberId) {
      res.json({ error: "ID must be a number" });
    }

    const member = await memberRepository.read(memberId);
    if (!member) {
      res.sendStatus(404);
    } else {
      res.json(member);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const member = {
      id: Number(req.query.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      premium: req.body.premium,
      role: req.body.role,
    };
    const affectedRows = await memberRepository.update(member);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const member = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };
    const insertId = await memberRepository.create(member);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.query.id);
    await memberRepository.delete(memberId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
