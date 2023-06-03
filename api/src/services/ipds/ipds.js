import { db } from 'src/lib/db'

export const ipds = () => {
  return db.ipd.findMany()
}

export const ipd = ({ id }) => {
  return db.ipd.findUnique({
    where: { id },
  })
}

export const createIpd = ({ input }) => {
  return db.ipd.create({
    data: input,
  })
}

export const updateIpd = ({ id, input }) => {
  return db.ipd.update({
    data: input,
    where: { id },
  })
}

export const deleteIpd = ({ id }) => {
  return db.ipd.delete({
    where: { id },
  })
}

export const Ipd = {
  patient: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).patient()
  },
  Operation: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).Operation()
  },
  IpdCharges: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdCharges()
  },
  IpdConsultation: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdConsultation()
  },
  IpdPayment: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdPayment()
  },
}
