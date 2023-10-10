import { db } from 'src/lib/db'

export const medicines = () => {
  return db.medicine.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const medicine = ({ id }) => {
  return db.medicine.findUnique({
    where: { id },
  })
}

export const createMedicine = ({ input }) => {
  return db.medicine.create({
    data: input,
  })
}

export const updateMedicine = ({ id, input }) => {
  return db.medicine.update({
    data: input,
    where: { id },
  })
}


export const deleteMedicine = ({ id }) => {
  return db.medicine.delete({
    where: { id },
  })
}
export const deleteEmptyMedicine = async () => {
  await db.medicine.deleteMany({
    where: { quantity:0 },
  })
  return -1
}

export const Medicine = {
  pid: (_obj, { root }) => {
    return db.medicine.findUnique({ where: { id: root?.id } }).pid()
  },
}
