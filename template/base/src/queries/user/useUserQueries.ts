// 'use client';

// // Convention: The file name should follow 'useSomethingQueries
// import type { GetUserRequest, CreateUserRequest, UpdateUserRequest, DeleteUserRequest } from '~/services';
// import { getAllUser, getUser, createUser, updateUser, deleteUser } from '~/services';
// import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
// import { QUERY_KEY } from '~/queries/query-key';

// const useGetAllUser = () => {
//   return useQuery({
//     queryFn: () => getAllUser(),
//     queryKey: [QUERY_KEY.USER],
//     select: (axiosResponse) => {
//       return axiosResponse.data;
//     },
//   });
// };

// const useGetUser = ({ param }: GetUserRequest) => {
//   return useQuery({
//     queryFn: () => getUser({ param }),
//     queryKey: [QUERY_KEY.USER, { param }],
//     select: (axiosResponse) => {
//       return axiosResponse.data;
//     },
//   });
// };

// const useUserMutation = () => {
//   const queryClient = useQueryClient();

//   const handleCreateUser = useMutation({
//     mutationFn: ({ body }: CreateUserRequest) => createUser({ body }),
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({queryKey: [QUERY_KEY.USER]});
//     },
//     onError: () => {},
//   });

//   const handleUpdateUser = useMutation({
//     mutationFn: ({ param, body }: UpdateUserRequest) => updateUser({ param, body }),
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: [QUERY_KEY]});
//     },
//     onError: () => {},
//   });

//   const handleDeleteUser = useMutation({
//     mutationFn: ({ param }: DeleteUserRequest) => deleteUser({ param }),
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey:[QUERY_KEY]});
//     },
//     onError: () => {},
//   });

//   return { handleCreateUser, handleUpdateUser, handleDeleteUser };
// };

// export { useGetAllUser, useGetUser, useUserMutation };
