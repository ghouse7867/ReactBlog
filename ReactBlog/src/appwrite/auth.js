import config from "../../conf/config";

import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)  
        this.account = new Account(this.client)
    }
     async createAccount({email,password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount) {
               // call method
               return this.login({email,password});
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw console.log(error)
            
        } 

     }
     async login({email, password}){
          try {
            return await this.account.createEmailPasswordSession(email,password);
          } catch (error) {
            throw console.log(error)
          }  
     }
     async getCurrentUser(){
        try {
            return await this.account.get();
          } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error---", error);
          } 

          return null;
     }
     async logOut() {
      try {
        await this.account.deleteSessions();
        console.log("Logged out successfully!"); // Optional logging
        return true; // Or return a success message
      } catch (error) {
        console.error("Logout error:", error);
        return false; // Or throw an error object
      }
    }
}

const authService = new AuthService;

export default authService;