export interface RedditPost {
  id: string;
  title: string;
  numComments: number;
  score: number;
  upvoteRatio: number;
  created: number;
  author: string;
  authorId: string;
  permaLink: string;
}