import { v4 as uuid } from "uuid";

export class Url {

      id!: string;
      urlName!: string;
      totalClicks!: number;
      originalUrl!: string;
      shortenedUrl!: string;
      createdIn!: Date;

      constructor(data: any) {

            if(data) {
                  this.id = data.id;
                  this.originalUrl = data.originalUrl;
                  this.shortenedUrl = data.shortenedUrl;
            }
      }
}