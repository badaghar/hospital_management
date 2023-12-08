import { db } from 'src/lib/db'

export const ipdHomoPrescriptions = () => {
  return db.ipdHomoPrescription.findMany()
}

export const ipdHomoPrescription = ({ id }) => {
  return db.ipdHomoPrescription.findUnique({
    where: { id },
  })
}

export const createIpdHomoPrescription = async ({ input }) => {
  await db.ipdHomoPrescription.createMany({
    data: input,
  })
}

export const updateIpdHomoPrescription = ({ id, input }) => {
  return db.ipdHomoPrescription.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdHomoPrescription = ({ id }) => {
  return db.ipdHomoPrescription.delete({
    where: { id },
  })
}

export const IpdHomoPrescription = {
  ipd: (_obj, { root }) => {
    return db.ipdHomoPrescription.findUnique({ where: { id: root?.id } }).ipd()
  },
}
