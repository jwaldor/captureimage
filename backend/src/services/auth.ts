import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { clerkClient, User } from "@clerk/express";
import { DBUserService } from "./database/user";
import { NextFunction } from "express";

// Extend the Express.Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

const dbService = DBUserService();

export const attachUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("authAndUserMiddleware");
  const auth = getAuth(req);
  const clerkUser = auth.userId;
  console.log("clerkUser", clerkUser);
  if (!clerkUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const response = await clerkClient.users.getUser(clerkUser);

  const user: { id: string; email: string } | null = await dbService.getUser(
    clerkUser
  );
  req.user =
    user ||
    (await dbService.createUser(
      clerkUser,
      response.emailAddresses[0].emailAddress
    ));
  // Validate response using authResponseSchema
  // const parsedResponse = authResponseSchema.safeParse(res);
  // if (!parsedResponse.success) {
  //   res.status(500).json({ error: "Invalid response format" });
  //   return;
  // }
  next();
};
