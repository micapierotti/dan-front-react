import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  username: faker.name.findName(),
  email: faker.internet.email(),
  cantObras: faker.datatype.number(10),
  cuit: sample(['927393875', '409584949', '1111111111', '666666666']),
  razonSocial: sample(['927393875', '409584949', '1111111111', '666666666'])
}));

export default users;
