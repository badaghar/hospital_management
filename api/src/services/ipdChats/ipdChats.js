import { db } from 'src/lib/db'

export const ipdChats = () => {
  return db.ipdChat.findMany()
}

export const ipdChat = ({ id }) => {
  return db.ipdChat.findUnique({
    where: { id },
  })
}

export const createIpdChat = ({ input }) => {
  return db.ipdChat.create({
    data: input,
  })
}

export const updateIpdChat = ({ id, input }) => {
  return db.ipdChat.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdChat = ({ id }) => {
  return db.ipdChat.delete({
    where: { id },
  })
}

export const IpdChat = {
  ipd: (_obj, { root }) => {
    return db.ipdChat.findUnique({ where: { id: root?.id } }).ipd()
  },
}
