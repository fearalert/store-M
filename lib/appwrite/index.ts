"use server";

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

// export const createSessionClient = async () => {
//   const client = new Client()
//     .setEndpoint(appwriteConfig.endpointUrl)
//     .setProject(appwriteConfig.projectId);

//   const session = (await cookies()).get("appwrite-session");

//   if (!session || !session.value) throw new Error("No session");

//   client.setSession(session.value);

//   return {
//     get account() {
//       return new Account(client);
//     },
//     get databases() {
//       return new Databases(client);
//     },
//   };
// };


export const createSessionClient = async () => {
    const client = new Client().setEndpoint(appwriteConfig.endpointUrl)
                    .setProject(appwriteConfig.projectId);

    const session = (await cookies()).get("appwrite-session");

    if(!session || !session.value) throw new Error("No Session");

    client.setSession(session.value);

    return {
        getAccount() {
            return new Account(client);
        },
        getDatabases(){
            return new Databases(client);
        }
    }

}

export const createAdminClient = async () => {
    const client = new Client().setEndpoint(appwriteConfig.endpointUrl)
                            .setProject(appwriteConfig.projectId)
                            .setKey(appwriteConfig.secretKey);
    
    return {
        getAccount(){
            return new Account(client);
        },
        getDatabases(){
            return new Databases(client);
        },
        getStorage(){
            return new Storage(client);
        },
        getAvatar(){
            return new Avatars(client);
        }
    }
}