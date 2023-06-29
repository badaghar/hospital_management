import { db } from 'src/lib/db'

export const ipdOperationPayments = () => {
  return db.ipdOperationPayment.findMany()
}

export const ipdOperationPayment = ({ id }) => {
  return db.ipdOperationPayment.findUnique({
    where: { id },
  })
}

export const createIpdOperationPayment = async ({ input }) => {
  await db.ipdOperationPayment.createMany({
    data: input,
  })
}

export const updateIpdOperationPayment = ({ id, input }) => {
  return db.ipdOperationPayment.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdOperationPayment = ({ id }) => {
  return db.ipdOperationPayment.delete({
    where: { id },
  })
}

export const IpdOperationPayment = {
  ipd: (_obj, { root }) => {
    return db.ipdOperationPayment.findUnique({ where: { id: root?.id } }).ipd()
  },
}
