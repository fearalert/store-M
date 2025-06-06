'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getUserByEmail, sendEmailOTP, handleError } from "../helper/helper";
import { defaultAvatarUrl } from "@/constants/constants";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";


export const createUserAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("User already exists.");
      return null;
    }

    const accountId = await sendEmailOTP({ email });
    if (!accountId) {
      console.log("Failed to send an OTP");
      return null;
    }

    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: defaultAvatarUrl,
        accountId,
      }
    );

    return parseStringify({ accountId });
  } catch (error) {
    console.error(
      "CreateUserAccountError:",
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return null;
  }
};


export const loginUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }
    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    console.error(
      "LoginUserError:",
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    return parseStringify({ accountId: null, error: "Login failed" });
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
    const isProduction = process.env.NODE_ENV === "production";

    accountId = accountId.replace(/^"|"$/g, "");

    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    return session.$id;
  } catch (error) {
    handleError(error, "Failed to verify OTP");
    return null;
  }
};


export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error("getCurrentUserError:", error);
    return null;
  }
};


export const logOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");

    cookies().delete("appwrite-session", {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    redirect("/auth/login");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  }
};
