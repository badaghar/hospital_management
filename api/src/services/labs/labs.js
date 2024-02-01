import { db } from 'src/lib/db'

export const labs = () => {
  return db.lab.findMany()
}

export const lab = ({ id }) => {
  return db.lab.findUnique({
    where: { id },
  })
}

export const createLab = ({ input }) => {
  return db.lab.create({
    data: input,
  })
}

export const updateLab = ({ id, input }) => {
  return db.lab.update({
    data: input,
    where: { id },
  })
}

export const deleteLab = ({ id }) => {
  return db.lab.delete({
    where: { id },
  })
}

export const Lab = {
  LabPriceList: (_obj, { root }) => {
    return db.lab.findUnique({ where: { id: root?.id } }).LabPriceList()
  },
}
