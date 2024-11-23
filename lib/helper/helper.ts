import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

export const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();
  
    try {
      const results = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
      );
  
      return results.total > 0 ? results.documents[0] : null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  };
  


export const handleError = (error: unknown, message: string) => {
    console.log(error, message);

    throw error; 
}


export const sendEmailOTP = async ({email}:{email: string}) => {
    const {account} = await createAdminClient();

    try{
        const session = await account.createEmailToken(ID.unique(), email);
        return session.userId;
    } catch(error){
        handleError(error, "Failed to send OTP");
    }
}

export const createQueries = (currentUser: Models.Document) => {
  const queries = [
    Query.or([
      Query.equal('owner', [currentUser.$id]),
      Query.contains('users', [currentUser.email])
    ])
  ];

  return queries;
}