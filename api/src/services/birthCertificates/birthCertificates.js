import { db } from 'src/lib/db'

export const birthCertificates = () => {
  return db.birthCertificate.findMany()
}

export const birthCertificate = ({ id }) => {
  return db.birthCertificate.findUnique({
    where: { id },
  })
}

export const createBirthCertificate = ({ input }) => {
  return db.birthCertificate.create({
    data: input,
  })
}

export const updateBirthCertificate = ({ id, input }) => {
  return db.birthCertificate.update({
    data: input,
    where: { id },
  })
}

export const deleteBirthCertificate = ({ id }) => {
  return db.birthCertificate.delete({
    where: { id },
  })
}
