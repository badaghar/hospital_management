import { db } from 'src/lib/db'

export const ipdChargeses = () => {
  return db.ipdCharges.findMany()
}

export const ipdCharges = ({ id }) => {
  return db.ipdCharges.findUnique({
    where: { id },
  })
}

export const createIpdCharges = async ({ input }) => {
  const ipdId = input[0].ipdId
  const d1 = await db.ipdCharges.deleteMany({
    where:{
      ipdId
    }
  })
  const data= await db.ipdCharges.createMany({
    data: input,
  })
}

export const updateIpdCharges = ({ id, input }) => {
  return db.ipdCharges.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdCharges = ({ id }) => {
  return db.ipdCharges.delete({
    where: { id },
  })
}

export const IpdCharges = {
  ipd: (_obj, { root }) => {
    return db.ipdCharges.findUnique({ where: { id: root?.id } }).ipd()
  },
}
