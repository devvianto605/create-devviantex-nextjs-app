// // Convention: The file name should follow 'somethingServices
// import type { AxiosResponse } from 'axios';
// import axios from 'axios';
// // OR import axios from '@libs/axios';

// const servicePath = '/'
// export type UserData = {}

// export async function getAllUser(): Promise<AxiosResponse<UserData>> {
//   const url = `${servicePath}`;

//   return axios({ method: 'GET', url });
// }

// type GetUserRequest = {
//   param: any
// };

// export async function getUser({param}: GetUserRequest): Promise<AxiosResponse<UserData>> {
//   const url = `${servicePath}/${param}`;

//   return axios({ method: 'GET', url });
// }

// type CreateUserRequest = {
//   body: any
// };

// export async function createUser({body}: CreateUserRequest): Promise<AxiosResponse<UserData>> {
//   const url = `${servicePath}`;

//   return axios({ data: body, method: 'POST', url });
// }

// type UpdateUserRequest = {
//   param: any
//   body: any
// };

// export async function updateUser({param,body}: UpdateUserRequest): Promise<AxiosResponse<UserData>> {
//   const url = `${servicePath}/${param}`;

//   return axios({ data: body, method: 'PUT', url });
// }

// type DeleteUserRequest = {
//   param: any
//   body: any
// };

// export async function deleteUser({param,body}: DeleteUserRequest): Promise<AxiosResponse<UserData>> {
//   const url = `${servicePath}/${param}`;

//   return axios({ data: body, method: 'DELETE', url });
// }
