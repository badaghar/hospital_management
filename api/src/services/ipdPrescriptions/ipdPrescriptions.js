import { db } from 'src/lib/db'

export const ipdPrescriptions = () => {
  return db.ipdPrescription.findMany()
}

export const ipdPrescription = ({ id }) => {
  return db.ipdPrescription.findUnique({
    where: { id },
  })
}

export const createIpdPrescription = async ({ input }) => {
  // console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nipd',input)
  try {
    const id = input[0].ipdId
    await db.ipd.update({
      data:{
        isWaiting:false,
        pharmacyWaiting:true
      },
      where:{id}
    })
    // console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nid',id)
  } catch (error) {
    // console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nerror')

  }
  await db.ipdPrescription.createMany({
    data: input,
  })
}

export const updateIpdPrescription = ({ id, input }) => {
  return db.ipdPrescription.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdPrescription = ({ id }) => {
  return db.ipdPrescription.delete({
    where: { id },
  })
}

export const IpdPrescription = {
  ipd: (_obj, { root }) => {
    return db.ipdPrescription.findUnique({ where: { id: root?.id } }).ipd()
  },
  medicine_detail: (_obj, { root }) => {
    return db.ipdPrescription
      .findUnique({ where: { id: root?.id } })
      .medicine_detail()
  },
}
