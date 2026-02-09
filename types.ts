
export interface User {
  id: string;
  nickname: string;
  password?: string;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
  savedPosts: string[];
  postsCount: number;
  lastActive: number;
}

export interface Comment {
  id: string;
  authorId: string;
  authorNickname: string;
  text: string;
  timestamp: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  authorId: string;
  authorNickname: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: number;
  likes: string[];
  comments: Comment[];
  shares: number;
  saves: string[];
}

export enum Page {
  FEED = 'FEED',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN'
}
