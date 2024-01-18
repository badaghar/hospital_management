import { db } from 'src/lib/db'

export const durations = () => {
  return db.duration.findMany()
}

export const duration = ({ id }) => {
  return db.duration.findUnique({
    where: { id },
  })
}

export const createDuration = ({ input }) => {
  return db.duration.create({
    data: input,
  })
}

export const updateDuration = ({ id, input }) => {
  return db.duration.update({
    data: input,
    where: { id },
  })
}

export const deleteDuration = ({ id }) => {
  return db.duration.delete({
    where: { id },
  })
}
