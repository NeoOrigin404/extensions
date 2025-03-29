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
  console.info("req.query", req.query);
  try {
    const memberId = Number(req.query.id);
    console.info("Member:", memberId);
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

export default { browse, read };
