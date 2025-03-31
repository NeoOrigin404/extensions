import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import memberRepository from "../modules/member/memberRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 32 * 1024,
  timeCost: 10,
  parallelism: 4,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const member = await memberRepository.readByEmailWithPassword(email);
    if (!member) {
      res.sendStatus(422);
    }

    const verified = await argon2.verify(member.hashed_password, password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: member.id,
        email: member.email,
        role: member.role,
        premium: member.premium,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", token).json({
        message: "Connexion réussie",
        role: payload.role,
        email: payload.email,
        premium: payload.premium,
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("auth").send("Déconnexion réussie");
  } catch (error) {
    next(error);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP_SECRET dans le .env");
  }
  try {
    const { auth } = req.cookies;
    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayLoad = jwt.verify(auth, process.env.APP_SECRET);
    if (typeof resultPayLoad !== "object") {
      throw new Error("Token invalide");
    }

    req.member = {
      id: resultPayLoad.id,
      email: resultPayLoad.email,
      role: resultPayLoad.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.member.role === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    if (req.member.role === "user") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

export default { hashPassword, login, logout, verify, verifyAdmin, verifyUser };
