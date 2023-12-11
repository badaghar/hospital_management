import { db } from 'src/lib/db'
import * as Filestack from 'filestack-js'
export const files = () => {
  return db.file.findMany()
}

export const file = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile = ({ input }) => {
  return db.file.create({
    data: input,
  })
}

export const updateFile = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  })
}

export const deleteFile = async ({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const image = await db.file.findUnique({ where: { id } })

  // The `security.handle` is the unique part of the Filestack file's url.
  const handle = image.url.split('/').pop()

  const security = Filestack.getSecurity(
    {
      // We set `expiry` at `now() + 5 minutes`.
      expiry: new Date().getTime() + 5 * 60 * 1000,
      handle,
      call: ['remove'],
    },
    process.env.REDWOOD_ENV_FILESTACK_SECRET
  )

  await client.remove(handle, security)

  return db.file.delete({ where: { id } } )
  // return db.file.delete({
  //   where: { id },
  // })
}

export const File = {
  ipd: (_obj, { root }) => {
    return db.file.findUnique({ where: { id: root?.id } }).ipd()
  },
}
