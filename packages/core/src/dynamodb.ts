import AWS, { DynamoDB } from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params: DynamoDB.DocumentClient.Get) => client.get(params).promise(),
  put: (params: DynamoDB.DocumentClient.Put) => client.put(params).promise(),
  query: (params: DynamoDB.DocumentClient.QueryInput) =>
    client.query(params).promise(),
  update: (params: DynamoDB.DocumentClient.Update) =>
    client.update(params).promise(),
  delete: (params: DynamoDB.DocumentClient.Delete) =>
    client.delete(params).promise(),
};
