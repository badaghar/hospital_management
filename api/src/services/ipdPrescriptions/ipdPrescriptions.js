import { db } from 'src/lib/db'

export const ipdPrescriptions = () => {
  return db.ipdPrescription.findMany()
}

export const ipdPrescription = ({ id }) => {
  return db.ipdPrescription.findUnique({
    where: { id },
  })
}

export const createIpdPrescription = async ({ input }) => {
  await db.ipdPrescription.createMany({
    data: input,
  })
}

export const updateIpdPrescription = ({ id, input }) => {
  return db.ipdPrescription.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdPrescription = ({ id }) => {
  return db.ipdPrescription.delete({
    where: { id },
  })
}

export const IpdPrescription = {
  ipd: (_obj, { root }) => {
    return db.ipdPrescription.findUnique({ where: { id: root?.id } }).ipd()
  },
  medicine_detail: (_obj, { root }) => {
    return db.ipdPrescription
      .findUnique({ where: { id: root?.id } })
      .medicine_detail()
  },
}
