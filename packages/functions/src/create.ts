import { Table } from 'sst/node/table';
import * as uuid from 'uuid';
import handler from '@notes/core/handler';
import dynamoDb from '@notes/core/dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  if (!event.body) {
    throw new Error('Missing request body');
  }
  const data = JSON.parse(event.body);
  const userId =
    event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  if (!userId) {
    throw new Error('Missing user id');
  }
  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      userId: userId,
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
