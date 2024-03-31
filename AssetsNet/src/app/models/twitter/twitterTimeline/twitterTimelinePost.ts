import { TwitterTimelineMedia } from "./twitterTimelineMedia"

export interface TwitterTimelinePost {
  tweet_id: string;
  bookmarks: number;
  created_at: string;
  favorites: number;
  text: string;
  lang: string;
  views: string;
  quotes: number;
  replies: number;
  retweets: number;
  conversation_id: string;
  media: TwitterTimelineMedia;
}
