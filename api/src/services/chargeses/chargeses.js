import { db } from 'src/lib/db'

export const chargeses = () => {
  return db.charges.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const charges = ({ id }) => {
  return db.charges.findUnique({
    where: { id },
  })
}

export const createCharges = ({ input }) => {
  return db.charges.create({
    data: input,
  })
}

export const updateCharges = ({ id, input }) => {
  return db.charges.update({
    data: input,
    where: { id },
  })
}

export const deleteCharges = ({ id }) => {
  return db.charges.delete({
    where: { id },
  })
}
