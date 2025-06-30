// utility func for making gql req
//dùng để định nghĩa kiểu cho document GraphQL (query/mutation)
import { TypedDocumentNode } from '@apollo/client/core/types';
// dùng để chuyển document graphql thành chuỗi query
import { print } from 'graphql';

//shape of the response containing data | error
// đn interface cho kqua trả về của fetchGraphQL , có thể có data | error
export interface FetchResult<TData> {
  data?: TData; 
  error?: string;
}

// option pass to the fetch func
// đn interface cho câc tham số truyền vào fetchGraphQL
export interface GraphqlRequestOptions<TData, V> {
  document: TypedDocumentNode<TData, V>; // Document gql (query,mutation) đã đc định kiểu
  variables?: V; // biến truyền vào cho query/mutation
  config?: RequestInit; // cấu hình thêm cho fetch (headers,method,...)
  token?: string; // token xác thực
}

//
/**
 * Sends a GraphQL request and returns the response data.
 *
 * @param {TypedDocumentNode<TData, V>} document - The GraphQL query/mutation document.
 * @param {V} [variables] - The variables for the GraphQL query/mutation.
 * @param {RequestInit} [config] - Optional configuration for the fetch request.
 *
 * @returns {Promise<FetchResult<TData>>} The result of the GraphQL request.
 */
// send post req to /graphql endpoint & return the result in type-safe way
// TData kiểu dlieu mà mong muốn nhận từ server (kqua của query/mutation)
// V kiểu dlieu của biến mà truyền vào query/mutation 
export async function fetchGraphQL<TData, V>({
  document, // document graphql (query/mutation)
  variables, // biến truyền vào
  config, // cấu hình fetch
  token, // token
}: GraphqlRequestOptions<TData, V>): Promise<FetchResult<TData>> {
  // chuyển document gql thành chuỗi string
  const query = print(document);
  // gửi req tới endpoint gql  
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    body: JSON.stringify({ query, variables }), // body là chuỗi json
    ...config, // thêm các cấu hình khác nếu có
  }).then(async (res) => {
    // nhận đc phản hồi , chuyển sang JSON
    const { data, errors } = await res.json();
    if (errors) {
      console.log('Error', JSON.stringify(errors));
      return { error: JSON.stringify(errors[0].message) };
    }
    // ko lỗi thì trả về data
    return { data };
  });
}
