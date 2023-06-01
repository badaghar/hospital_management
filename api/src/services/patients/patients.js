import { db } from 'src/lib/db'

export const patients = () => {
  return db.patient.findMany()
}

export const patient = ({ id }) => {
  return db.patient.findUnique({
    where: { id },
  })
}

export const createPatient = async ({ input }) => {
  const lastRow = await db.patient.findFirst({
    orderBy: {
      id: 'desc'
    }
  });

  const no = lastRow ? parseInt(lastRow.id) + 1 : 1;
  input['name'] = input['name'] + ' ( ' + no + ' ) '
  return db.patient.create({
    data: input,
  })
}

export const updatePatient = ({ id, input }) => {
  input['name'] = input['name'] + ' ( ' + id + ' ) '
  return db.patient.update({
    data: input,
    where: { id },
  })
}

export const deletePatient = ({ id }) => {
  return db.patient.delete({
    where: { id },
  })
}

export const Patient = {
  did: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).did()
  },
  SaleMedicine: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).SaleMedicine()
  },
}
