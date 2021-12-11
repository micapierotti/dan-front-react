import faker from 'faker'
import { sample } from 'lodash'
import { mockImgProduct } from '../utils/mockImages'

const obras = [...Array(24)].map((_, index) => ({
  id: faker.address.zipCode(),
  avatarUrl: mockImgProduct(index + 1),
  tipo: sample(['EDIFICIO', 'CASA', 'REFORMA', 'VIAL']),
  direccion: faker.address.city(),
  clienteId: faker.company.companyName(),
  superficie: faker.random.number()
}))

export default obras
