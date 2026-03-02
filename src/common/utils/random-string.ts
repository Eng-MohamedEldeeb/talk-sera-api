import RS, { Charset } from 'randomstring';
import { RANDOM_STRING_LENGTH } from 'src/config/env';

export const generateCode = ({
  len,
  type,
}: {
  len?: number;
  type?: Charset;
} = {}) => {
  return RS.generate({
    length: len ?? Number(RANDOM_STRING_LENGTH),
    charset: type,
  });
};
