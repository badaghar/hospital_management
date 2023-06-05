import { db } from 'src/lib/db'

export const beds = () => {
  return db.bed.findMany()
}

export const bed = ({ id }) => {
  return db.bed.findUnique({
    where: { id },
  })
}

export const createBed = ({ input }) => {
  return db.bed.create({
    data: input,
  })
}

export const updateBed = ({ id, input }) => {
  return db.bed.update({
    data: input,
    where: { id },
  })
}

export const deleteBed = ({ id }) => {
  return db.bed.delete({
    where: { id },
  })
}

export const Bed = {
  floor: (_obj, { root }) => {
    return db.bed.findUnique({ where: { id: root?.id } }).floor()
  },
  ipd: (_obj, { root }) => {
    return db.bed.findUnique({ where: { id: root?.id } }).ipd()
  },
}
