import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 1,
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1651856019/bci4nbgfxkgou2mf794s.jpg',
    content: 'At  consequatur aut perferendis doloribus asperiores repellat.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: {
      commentCount: 0,
      comments: [],
    },
    username: 'adarshbalika',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: 2,
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1651855978/dvuafylybelhwuzigj0o.jpg',
    content: 'At consequatur aut perferendis doloribus asperiores repellat.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: {
      commentCount: 0,
      comments: [],
    },
    username: 'amarnarute',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 3,
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1651856103/jbkypp1de1o9mapzv2wj.jpg',
    content:
      'At vero Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: {
      commentCount: 0,
      comments: [],
    },
    username: 'abhishaikh',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 4,
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1651856117/alebzlhztdps5rljaj0j.jpg',
    content:
      'At vero eos et, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: {
      commentCount: 0,
      comments: [],
    },
    username: 'vivekbindra',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 5,
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1651856019/bci4nbgfxkgou2mf794s.jpg',
    content:
      'At vero eosias consequatur aut perferendis doloribus asperiores repellat.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: {
      commentCount: 0,
      comments: [],
    },
    username: 'vivekbindra',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
