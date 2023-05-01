import { ApplicationError } from '@/protocols';

export function forbidden(): ApplicationError {
  return {
    name: 'Forbidden',
    message: "Can't go on!",
  };
}
