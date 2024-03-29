import { Thumbnail } from "./thumbnail";

export interface News {
    link: string;
    publisher: string;
    providerPublishTime: Date;
    title: string;
    type: string;
    uuid: string;
    thumbnail: Thumbnail;
}