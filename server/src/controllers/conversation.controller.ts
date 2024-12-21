import { Request, Response } from "express";
import { prisma } from "..";
export const createConverstions = async (req: Request, res: Response) => {
  try {
    const { userIds } = req.body;
    const conversation = await prisma.conversation.create({
      data: {
        users: { create: userIds.map((userId: number) => ({ userId })) },
      },
    });
    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

export const conversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const conversation = await prisma.conversation.findUnique({
      where: { id: parseInt(id, 10) },
      include: { users: true, messages: true },
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
};
