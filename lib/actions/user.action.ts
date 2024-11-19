'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getUserByEmail, sendEmailOTP, handleError } from "../helper/helper";
import { defaultAvatarUrl } from "@/constants/constants";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const createUserAccount = async ({ fullName, email }: 
    { fullName: string; email: string }) => {
   
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        throw new Error("User already exists.");
      }
    
    
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

export const loginUser = async ({ email }: { email: string }) => {
    
  try{
    const existingUser = await getUserByEmail(email);

  
    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
}

  export const verifySecret = async ({
    accountId,
    password,
  }: {
    accountId: string;
    password: string;
  }) => {
    try {
      accountId = accountId.replace(/^"|"$/g, "");
      const { account } = await createAdminClient();
  
      const session = await account.createSession(accountId, password);
  
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
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