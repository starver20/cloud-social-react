import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: 'Amar',
    lastName: 'Narute',
    username: 'amarnarute',
    password: 'amarnarute123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Abhi',
    lastName: 'Shaikh',
    username: 'abhishaikh',
    password: 'abhishaikh123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Vivek',
    lastName: 'Bindra',
    username: 'vivekbindra',
    password: 'vivekbindra123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Adarsh',
    lastName: 'Balika',
    username: 'adarshbalika',
    password: 'adarshBalika123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Bad',
    lastName: 'Balak',
    username: 'badbalak',
    password: 'badbalak123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Rohit',
    lastName: 'Mishra',
    username: 'rohitmishra',
    password: 'rohitmishra123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Elon',
    lastName: 'Musk',
    username: 'elonmusk',
    password: 'elonmusk123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Abhinav',
    lastName: 'Bindra',
    username: 'abhinavbindra',
    password: 'abhinavbindra123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Tiger',
    lastName: 'Shroff',
    username: 'tigershroff',
    password: 'tigershroff123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: 'Hrithik',
    lastName: 'Roshan',
    username: 'hrithikroshan',
    password: 'hrithikroshan123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
