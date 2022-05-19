import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 1,
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1652903656/galen-crout-FU40Oijx8dk-unsplash_u3pg2s.webp',
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
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1652903655/usgs-CGxdRJknf4I-unsplash_qfyxdf.webp',
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
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1652903655/ben-robbins-z_qdiCJXVAE-unsplash_ctridd.webp',
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
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1652903655/maxwell-nelson-1r2CG6EQ4-Y-unsplash_bg8haz.webp',
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
    url: 'https://res.cloudinary.com/dq81bdilo/image/upload/v1652903654/nattu-adnan-Ai2TRdvI6gM-unsplash_yzille.webp',
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
