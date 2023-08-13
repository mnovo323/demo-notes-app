import { Context } from 'aws-lambda';

// Define the shape of the Lambda response body
// If you know a more specific shape of your response, replace with appropriate type
interface LambdaResponseBody {
  [key: string]: any;
}

interface LambdaError {
  message: string;
  name: string;
  stack?: string;
}

type LambdaFunction = (
  event: any,
  context: Context
) => Promise<LambdaResponseBody>;

export default function handler(
  lambda: LambdaFunction
): (
  event: any,
  context: Context
) => Promise<{ statusCode: number; body: string }> {
  return async function (event: any, context: Context) {
    let body: LambdaResponseBody, statusCode: number;

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      console.error(e);
      body = {
        error: (e as LambdaError).message,
      };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  };
}
