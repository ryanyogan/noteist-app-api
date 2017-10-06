import * as dynamoDBLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export const main = async (event, context, cb) => {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDBLib.call('get', params);

    if (result.Item) {
      cb(null, success(result.Item));
    } else {
      cb(null, failure({ status: false, error: 'Item not found.' }));
    }
  } catch (error) {
    cb(null, failure({ status: false }));
  }
};
