// Convention: The file name should follow 'somethingServices
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { User } from './type';

const servicePath = 'https://randomuser.me/api/?results=5'
type Data = User

export async function getRandomUser(): Promise<AxiosResponse<Data>> {
  const url = `${servicePath}`;

  return axios({ method: 'GET', url });
}
