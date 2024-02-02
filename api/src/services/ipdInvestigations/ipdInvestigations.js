import { db } from 'src/lib/db'

export const ipdInvestigations = ({lab}) => {
  return db.ipdInvestigation.findMany({
    where:{
      lab_name:{
        equals: lab,
      },
      isWaiting:false
    }
  })
}
export const labWaiting = ({lab}) => {
  return db.ipdInvestigation.findMany({
    where:{
      lab_name:{
        equals: lab,
      },
      isWaiting:true
    }
  })
}

export const ipdInvestigation = ({ id }) => {
  return db.ipdInvestigation.findUnique({
    where: { id },
  })
}

export const createIpdInvestigation = ({ input }) => {
  return db.ipdInvestigation.create({
    data: input,
  })
}

export const updateIpdInvestigation = ({ id, input }) => {
  return db.ipdInvestigation.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdInvestigation = ({ id }) => {
  return db.ipdInvestigation.delete({
    where: { id },
  })
}

export const IpdInvestigation = {
  ipd: (_obj, { root }) => {
    return db.ipdInvestigation.findUnique({ where: { id: root?.id } }).ipd()
  },
}
