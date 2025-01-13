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
  console.error("Internal Error:", error);

  if (process.env.NODE_ENV === "production") {
    throw new Error(message); // Hide detailed errors in production
  } else {
    throw error; // Keep detailed errors in development
  }
};


export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    // Then send the OTP for email verification
    const emailToken = await account.createEmailToken(user.$id, email);
    console.log("Email verification token created:", emailToken);

    return user.$id;
  } catch (error) {
    handleError(error, "Failed to send OTP");
  }
};

export const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};
