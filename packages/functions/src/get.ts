import { Table } from 'sst/node/table';
import handler from '@notes/core/handler';
import dynamoDb from '@notes/core/dynamodb';

export const main = handler(async (event) => {
  if (!event.pathParameters || typeof event.pathParameters.id !== 'string') {
    throw new Error('Note ID missing or invalid.');
  }
  const userId =
    event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  if (!userId) {
    throw new Error('Missing user id');
  }
  const params = {
    TableName: Table.Notes.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: userId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
});
