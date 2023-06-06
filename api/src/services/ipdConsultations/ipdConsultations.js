import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const ipdConsultations = () => {
  return db.ipdConsultation.findMany()
}

export const ipdConsultation = ({ id }) => {
  return db.ipdConsultation.findUnique({
    where: { id },
  })
}

export const createIpdConsultation = async ({ input }) => {
  const data = await db.ipdConsultation.createMany({
    data: input,
  })
  logger.info(data)
}

export const updateIpdConsultation = ({ id, input }) => {
  return db.ipdConsultation.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdConsultation = ({ id }) => {
  return db.ipdConsultation.delete({
    where: { id },
  })
}

export const IpdConsultation = {
  ipd: (_obj, { root }) => {
    return db.ipdConsultation.findUnique({ where: { id: root?.id } }).ipd()
  },
}
