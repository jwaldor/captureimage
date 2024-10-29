import { User } from "@clerk/express";
import { Request, Response } from "express";
import { DBFileService } from "src/services/database/file";

export const saveNewFile = async (
  req: Request & { user?: User },
  res: Response
) => {
  // req.file is the file that was uploaded
  console.log(req.file);
  if (!req.user) {
    res.status(401).json({ error: "Failed to associate file with user" });
    return;
  }

  // store the file in the database
  if (req.file) {
    await DBFileService().saveFile(req.file?.filename, req.user.id);
  }

  res.send({ message: "File uploaded" });
};
