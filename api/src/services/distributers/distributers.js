import { db } from 'src/lib/db'

export const distributers = () => {
  return db.distributer.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const distributer = ({ id }) => {
  return db.distributer.findUnique({
    where: { id },
  })
}

export const createDistributer = ({ input }) => {
  return db.distributer.create({
    data: input,
  })
}

export const updateDistributer = ({ id, input }) => {
  return db.distributer.update({
    data: input,
    where: { id },
  })
}

export const deleteDistributer = ({ id }) => {
  return db.distributer.delete({
    where: { id },
  })
}

export const Distributer = {
  purchase_medicine: (_obj, { root }) => {
    return db.distributer
      .findUnique({ where: { id: root?.id } })
      .purchase_medicine()
  },
}
