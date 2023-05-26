import { db } from 'src/lib/db'

export const manufacturers = () => {
  return db.manufacturer.findMany()
}

export const manufacturer = ({ id }) => {
  return db.manufacturer.findUnique({
    where: { id },
  })
}

export const createManufacturer = ({ input }) => {
  return db.manufacturer.create({
    data: input,
  })
}

export const updateManufacturer = ({ id, input }) => {
  return db.manufacturer.update({
    data: input,
    where: { id },
  })
}

export const deleteManufacturer = ({ id }) => {
  return db.manufacturer.delete({
    where: { id },
  })
}

export const Manufacturer = {
  Product: (_obj, { root }) => {
    return db.manufacturer.findUnique({ where: { id: root?.id } }).Product()
  },
}
