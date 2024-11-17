'use server';

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getUserByEmail, sendEmailOTP, handleError } from "../helper/helper";
import { defaultAvatarUrl } from "@/constants/constants";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const createUserAccount = async ({ fullName, email, password }: 
    { fullName: string; email: string; password: string }) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new Error("User already exists.");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) {
    throw new Error("Failed to send an OTP");
  }

  const { databases } = await createAdminClient();

  const userDocument = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    ID.unique(),
    {
      fullName,
      email,
      password: hashedPassword,
      avatar: defaultAvatarUrl,
      accountId,
    }
  );

  return {
    id: userDocument.$id,
    fullName: userDocument.fullName,
    email: userDocument.email,
    accountId: parseStringify(userDocument.accountId),
    avatar: userDocument.avatar,
  };
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
    const user = await getUserByEmail(email);
  
    if (!user) {
      throw new Error("User does not exist.");
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }
  
    const { account } = await createAdminClient();
    try {
      const session = await account.createSession(email, password);
      return {
        message: "Login successful",
        sessionId: session.$id,
        user: {
          id: user.$id,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      handleError(error, "Failed to Login")
    }
  };

  export const verifySecret = async ({
    accountId,
    password,
  }: {
    accountId: string;
    password: string;
  }) => {
    try {
  
      const { account } = await createAdminClient();
      
      // Use the actual accountId (userId) here
      const session = await account.createSession(accountId, password);
  
      // Set session cookie for authentication
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
  
      // Return session details
      return parseStringify({ sessionId: session.$id });
    } catch (error) {
      handleError(error, "Failed to verify OTP");
    }
  };
  
  