import { db } from 'src/lib/db'

export const frequencies = () => {
  return db.frequency.findMany()
}

export const frequency = ({ id }) => {
  return db.frequency.findUnique({
    where: { id },
  })
}

export const createFrequency = ({ input }) => {
  return db.frequency.create({
    data: input,
  })
}

export const updateFrequency = ({ id, input }) => {
  return db.frequency.update({
    data: input,
    where: { id },
  })
}

export const deleteFrequency = ({ id }) => {
  return db.frequency.delete({
    where: { id },
  })
}
