import { RequestError } from 'got';

/*
 * Normalize response from our API
 * It is possible us to determine testCase passed
 * when api request is failed when it is needed to be failed
 * */
export async function tryCatchRequest(
  func: () => Promise<any>,
): Promise<
  Partial<{
    error: RequestError;
    response: any;
    data: any;
    status: number;
    success: boolean;
  }>
  > {
  try {
    const response = await func();
    return { response, data: response.data, success: true };
  } catch (error) {
    if (error instanceof RequestError) {
      return {
        error,
        response: error.response,
        data: error.response?.body,
        status: error.response?.statusCode,
        success: false,
      };
    }
    
    throw new Error(`un-handled error ${JSON.stringify(error, null, 2)}`);
  }
}
