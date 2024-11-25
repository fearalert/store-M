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
      throw new Error("User already exists.");
    }
  
  
    const accountId = await sendEmailOTP({ email });
    if (!accountId) {
      throw new Error("Failed to send an OTP");
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
    throw new Error(
      `CreateUserAccountError: ${
        error instanceof Error ? error.message : "Unknown error occurred"
      }`
    );
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
        throw new Error(
          `LoginUserError: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`
        );
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
      console.log("Before", accountId);

      const isProduction = process.env.NODE_ENV === "production";

      accountId = accountId.replace(/^"|"$/g, "");
      console.log("dgbfewggfueh");
      console.log(accountId);
      const { account } = await createAdminClient();
  
      const session = await account.createSession(accountId, password);
  
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,     
      });
  
      return parseStringify({ sessionId: session.$id });
    } catch (error) {
      handleError(error, "Failed to verify OTP");
    }
  };
  
  export const getCurrentUser = async () => {
    try {
      const { databases, account } = await createSessionClient();
  
      const result = await account.get();
  
      const user = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("accountId", result.$id)],
      );
  
      if (user.total <= 0) return null;
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error);
    }
  };
  

export const logOutUser = async () => {
  const {account} = await createSessionClient();

  try{
    await account.deleteSession("current");
    (await cookies()).delete('appwrite-session');

  }catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/auth/login");
  }
}