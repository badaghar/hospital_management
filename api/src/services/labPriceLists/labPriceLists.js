import { db } from 'src/lib/db'

export const labPriceLists = () => {
  return db.labPriceList.findMany()
}

export const labPriceList = ({ id }) => {
  return db.labPriceList.findUnique({
    where: { id },
  })
}

export const createLabPriceList = ({ input }) => {
  return db.labPriceList.create({
    data: input,
  })
}

export const updateLabPriceList = ({ id, input }) => {
  return db.labPriceList.update({
    data: input,
    where: { id },
  })
}

export const deleteLabPriceList = ({ id }) => {
  return db.labPriceList.delete({
    where: { id },
  })
}

export const LabPriceList = {
  lab: (_obj, { root }) => {
    return db.labPriceList.findUnique({ where: { id: root?.id } }).lab()
  },
}
