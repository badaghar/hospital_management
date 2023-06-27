import { db } from 'src/lib/db'

export const ipdLabChargeses = () => {
  return db.ipdLabCharges.findMany()
}

export const ipdLabCharges = ({ id }) => {
  return db.ipdLabCharges.findUnique({
    where: { id },
  })
}

export const createIpdLabCharges = async ({ input }) => {
  const data = await db.ipdLabCharges.createMany({
    data: input,
  })
}

export const updateIpdLabCharges = ({ id, input }) => {
  return db.ipdLabCharges.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdLabCharges = ({ id }) => {
  return db.ipdLabCharges.delete({
    where: { id },
  })
}

export const IpdLabCharges = {
  ipd: (_obj, { root }) => {
    return db.ipdLabCharges.findUnique({ where: { id: root?.id } }).ipd()
  },
}
