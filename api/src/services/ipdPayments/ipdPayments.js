import { db } from 'src/lib/db'

export const ipdPayments = () => {
  return db.ipdPayment.findMany()
}

export const ipdPayment = ({ id }) => {
  return db.ipdPayment.findUnique({
    where: { id },
  })
}

export const createIpdPayment = ({ input }) => {
  return db.ipdPayment.create({
    data: input,
  })
}

export const updateIpdPayment = ({ id, input }) => {
  return db.ipdPayment.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdPayment = ({ id }) => {
  return db.ipdPayment.delete({
    where: { id },
  })
}

export const IpdPayment = {
  ipd: (_obj, { root }) => {
    return db.ipdPayment.findUnique({ where: { id: root?.id } }).ipd()
  },
}
