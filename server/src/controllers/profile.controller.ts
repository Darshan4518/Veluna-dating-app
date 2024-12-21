import { Request, Response } from "express";
import { prisma } from "..";

export const createProfile = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      about,
      location,
      interests,
      gender,
      dateOfBirth,
      userId,
    } = req.body;

    const profile = await prisma.profile.create({
      data: {
        name,
        age,
        about,
        location,
        interests,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        profileImage: "",
        userId: parseInt(userId, 10),
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      age,
      about,
      location,
      interests,
      gender,
      dateOfBirth,
      profileImage,
    } = req.body;

    const updateData: { [key: string]: any } = {};

    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (about) updateData.about = about;
    if (location) updateData.location = location;
    if (interests) updateData.interests = interests;
    if (gender) updateData.gender = gender;
    if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
    if (profileImage) updateData.profileImage = profileImage;

    const updatedProfile = await prisma.profile.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
