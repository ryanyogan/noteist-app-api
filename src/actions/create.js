import uuid from 'uuid';
import * as dynamoDBLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context, callback) {
  // Request is passed in as JSON string `event.body`
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
    },
  };

  try {
    await dynamoDBLib.call('put', params);
    callback(null, success(params.Item));
  } catch (error) {
    callback(null, failure({ status: false }));
  }
}
