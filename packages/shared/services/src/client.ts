import axios, { AxiosResponse, Method } from 'axios';

interface ApiClientConfig<Data> {
  url: string;
  data?: Data;
  token?: string;
  method?: Method;
}

export async function apiClient<Body, Response = null>(
  config: ApiClientConfig<Body>,
): Promise<AxiosResponse<Response>> {
  const { data, token, url, method = 'GET' } = config;

  return axios({
    url,
    data,
    method,
    baseURL: process.env.API_URL,
    headers: {
      Authorization: (token && `Bearer ${token}`) || false,
    },
  });
}
