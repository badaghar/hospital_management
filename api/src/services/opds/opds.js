import { db } from 'src/lib/db'

export const opds = () => {
  return db.opd.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const opd = ({ id }) => {
  return db.opd.findUnique({
    where: { id },
  })
}

export const createOpd = ({ input }) => {
  return db.opd.create({
    data: input,
  })
}

export const updateOpd = ({ id, input }) => {
  return db.opd.update({
    data: input,
    where: { id },
  })
}

export const deleteOpd = ({ id }) => {
  return db.opd.delete({
    where: { id },
  })
}

export const Opd = {
  patient: (_obj, { root }) => {
    return db.opd.findUnique({ where: { id: root?.id } }).patient()
  },
}
