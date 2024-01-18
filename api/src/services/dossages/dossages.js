import { db } from 'src/lib/db'

export const dossages = () => {
  return db.dossage.findMany()
}

export const dossage = ({ id }) => {
  return db.dossage.findUnique({
    where: { id },
  })
}

export const createDossage = ({ input }) => {
  return db.dossage.create({
    data: input,
  })
}

export const updateDossage = ({ id, input }) => {
  return db.dossage.update({
    data: input,
    where: { id },
  })
}

export const deleteDossage = ({ id }) => {
  return db.dossage.delete({
    where: { id },
  })
}
