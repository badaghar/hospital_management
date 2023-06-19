import { db } from 'src/lib/db'

export const doctorFees = () => {
  return db.doctorFee.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const doctorFee = ({ id }) => {
  return db.doctorFee.findUnique({
    where: { id },
  })
}

export const createDoctorFee = ({ input }) => {
  return db.doctorFee.create({
    data: input,
  })
}

export const updateDoctorFee = ({ id, input }) => {
  return db.doctorFee.update({
    data: input,
    where: { id },
  })
}

export const deleteDoctorFee = ({ id }) => {
  return db.doctorFee.delete({
    where: { id },
  })
}

export const DoctorFee = {
  did: (_obj, { root }) => {
    return db.doctorFee.findUnique({ where: { id: root?.id } }).did()
  },
  Patient: (_obj, { root }) => {
    return db.doctorFee.findUnique({ where: { id: root?.id } }).Patient()
  },
}
