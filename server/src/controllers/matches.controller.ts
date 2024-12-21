import { Request, Response } from "express";
import { prisma } from "..";

export const matches = async (req: Request, res: Response) => {
  try {
    const { userId, matchedUserId, isStarred } = req.body;
    const match = await prisma.match.create({
      data: {
        userId: parseInt(userId, 10),
        matchedUserId: parseInt(matchedUserId, 10),
        isStarred,
      },
    });
    res.status(201).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create match" });
  }
};

export const getMatches = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const matches = await prisma.match.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { matchedUser: true },
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};
