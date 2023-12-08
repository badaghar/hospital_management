import { db } from 'src/lib/db'

export const homoMedicines = () => {
  return db.homoMedicine.findMany()
}

export const homoMedicine = ({ id }) => {
  return db.homoMedicine.findUnique({
    where: { id },
  })
}

export const createHomoMedicine = ({ input }) => {
  return db.homoMedicine.create({
    data: input,
  })
}

export const updateHomoMedicine = ({ id, input }) => {
  return db.homoMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteHomoMedicine = ({ id }) => {
  return db.homoMedicine.delete({
    where: { id },
  })
}
