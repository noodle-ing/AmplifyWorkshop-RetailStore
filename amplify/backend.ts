import { defineBackend } from '@aws-amplify/backend'; // Используем defineBackend вместо класса Backend
import { auth } from './auth/resource';
import { data } from './data/resource';
import { LocationMapStack } from './custom/maps/resource';

/**
 * @see https://docs.amplify.aws/react/build-system/deploy-anywhere/backend-definition/
 */
const backend = defineBackend({
  auth,
  data,
});

new LocationMapStack(
  backend.createStack('LocationMapStack'), // В новых версиях используется createStack
  'myLocationResource',
  {}
);