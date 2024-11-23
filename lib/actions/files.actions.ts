"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { createQueries, handleError } from "../helper/helper";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.action";

export const uploadFile = async ({
    file,
    ownerId,
    accountId,
    path,
  }: UploadFileProps) => {
    const { storage, databases } = await createAdminClient();
  
    try {
      const inputFile = InputFile.fromBuffer(file, file.name);
  
      const bucketFile = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        inputFile,
      );
  
      const fileDocument = {
        type: getFileType(bucketFile.name).fileType,
        name: bucketFile.name,
        url: constructFileUrl(bucketFile.$id),
        extension: getFileType(bucketFile.name).fileName?.split(".").pop()?.toLowerCase(),
        size: bucketFile.sizeOriginal,
        owner: ownerId,
        accountId,
        users: [],
        bucketFileId: bucketFile.$id,
      };
  
      const newFile = await databases
        .createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.filesCollectionId,
          ID.unique(),
          fileDocument,
        )
        .catch(async (error: unknown) => {
          await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
          handleError(error, "Failed to create file document");
        });
  
      revalidatePath(path);
      return parseStringify(newFile);
    } catch (error) {
      handleError(error, "Failed to upload file");
    }
  };

export const getFiles = async ()=> {
  const { databases } = await createAdminClient();

  try{
    const currentUser = getCurrentUser();

    if(!currentUser) throw new Error("User not found.");

    const queries = createQueries(await currentUser);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    return parseStringify(files);
  }catch(error){
    console.log(error);
    handleError(error, "Failed to get the files.")
  }
}