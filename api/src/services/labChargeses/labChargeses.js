import { db } from 'src/lib/db'

export const labChargeses = () => {
  return db.labCharges.findMany()
}

export const labCharges = ({ id }) => {
  return db.labCharges.findUnique({
    where: { id },
  })
}

export const createLabCharges = ({ input }) => {
  return db.labCharges.create({
    data: input,
  })
}

export const updateLabCharges = ({ id, input }) => {
  return db.labCharges.update({
    data: input,
    where: { id },
  })
}

export const deleteLabCharges = ({ id }) => {
  return db.labCharges.delete({
    where: { id },
  })
}
