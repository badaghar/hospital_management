import { db } from 'src/lib/db'

export const operations = () => {
  return db.operation.findMany()
}

export const operation = ({ id }) => {
  return db.operation.findUnique({
    where: { id },
  })
}

export const createOperation = ({ input }) => {
  return db.operation.create({
    data: input,
  })
}

export const updateOperation = ({ id, input }) => {
  return db.operation.update({
    data: input,
    where: { id },
  })
}

export const deleteOperation = ({ id }) => {
  return db.operation.delete({
    where: { id },
  })
}

export const Operation = {
  ipd: (_obj, { root }) => {
    return db.operation.findUnique({ where: { id: root?.id } }).ipd()
  },
}
