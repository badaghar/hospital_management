import { db } from 'src/lib/db'

export const manufacturerPurchaseMedicines = () => {
  return db.manufacturerPurchaseMedicine.findMany()
}

export const manufacturerPurchaseMedicine = ({ id }) => {
  return db.manufacturerPurchaseMedicine.findUnique({
    where: { id },
  })
}

export const createManufacturerPurchaseMedicine = ({ input }) => {
  return db.manufacturerPurchaseMedicine.create({
    data: input,
  })
}

export const updateManufacturerPurchaseMedicine = ({ id, input }) => {
  return db.manufacturerPurchaseMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteManufacturerPurchaseMedicine = ({ id }) => {
  return db.manufacturerPurchaseMedicine.delete({
    where: { id },
  })
}

export const ManufacturerPurchaseMedicine = {
  pid: (_obj, { root }) => {
    return db.manufacturerPurchaseMedicine
      .findUnique({ where: { id: root?.id } })
      .pid()
  },
}
