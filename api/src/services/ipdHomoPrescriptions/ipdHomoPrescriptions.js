import { db } from 'src/lib/db'

export const ipdHomoPrescriptions = () => {
  return db.ipdHomoPrescription.findMany()
}

export const ipdHomoPrescription = ({ id }) => {
  return db.ipdHomoPrescription.findUnique({
    where: { id },
  })
}

export const createIpdHomoPrescription = async ({ input }) => {
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
  await db.ipdHomoPrescription.createMany({
    data: input,
  })
}

export const updateIpdHomoPrescription = ({ id, input }) => {
  return db.ipdHomoPrescription.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdHomoPrescription = ({ id }) => {
  return db.ipdHomoPrescription.delete({
    where: { id },
  })
}

export const IpdHomoPrescription = {
  ipd: (_obj, { root }) => {
    return db.ipdHomoPrescription.findUnique({ where: { id: root?.id } }).ipd()
  },
}
