import type { RequestHandler } from "express";
import extensionRepository from "./extensionRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const extensions = await extensionRepository.readAll();
    res.json(extensions);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const extensionId = Number(req.query.id);

    if (!extensionId) {
      res.json({ error: "ID must be a number" });
    }

    const extension = await extensionRepository.read(extensionId);
    if (extension == null) {
      res.sendStatus(404);
    } else {
      res.json(extension);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const extension = {
      id: Number(req.query.id),
      logo: req.body.logo,
      name: req.body.name,
      description: req.body.description,
      is_premium: req.body.is_premium,
      is_active: req.body.is_active,
    };
    const affectedRows = await extensionRepository.update(extension);
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
    const extension = {
      logo: req.body.logo,
      name: req.body.name,
      description: req.body.description,
    };
    const insertId = await extensionRepository.create(extension);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const extensionId = Number(req.query.id);
    await extensionRepository.delete(extensionId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
