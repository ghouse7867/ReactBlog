import config from "../../conf/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userid }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userid
        }
      )
    } catch (error) {
      throw error
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    } catch (error) {
      throw error
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug

      )
      return true;
    } catch (error) {
      throw error
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )

    } catch (error) {
      throw error
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      )

    } catch (error) {
      throw error;
      return false;
    }
  }

  //file upload service

  async uploadFile(file) {
    try {
      console.log("bucket id - ", config.appwriteBucketId);
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
     
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
    } catch (error) {
      throw Error
      return true;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
      )
    } catch (error) {
      throw Error
      
    }
  }

}

const appwriteservice = new Service();

export default appwriteservice