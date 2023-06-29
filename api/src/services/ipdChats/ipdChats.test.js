import {
  ipdChats,
  ipdChat,
  createIpdChat,
  updateIpdChat,
  deleteIpdChat,
} from './ipdChats'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdChats', () => {
  scenario('returns all ipdChats', async (scenario) => {
    const result = await ipdChats()

    expect(result.length).toEqual(Object.keys(scenario.ipdChat).length)
  })

  scenario('returns a single ipdChat', async (scenario) => {
    const result = await ipdChat({ id: scenario.ipdChat.one.id })

    expect(result).toEqual(scenario.ipdChat.one)
  })

  scenario('creates a ipdChat', async (scenario) => {
    const result = await createIpdChat({
      input: {
        ipdId: scenario.ipdChat.two.ipdId,
        date: '2023-06-28T23:46:55.538Z',
        drug: 'String',
        dose: 'String',
        route: 'String',
        updated_at: '2023-06-28T23:46:55.538Z',
      },
    })

    expect(result.ipdId).toEqual(scenario.ipdChat.two.ipdId)
    expect(result.date).toEqual(new Date('2023-06-28T23:46:55.538Z'))
    expect(result.drug).toEqual('String')
    expect(result.dose).toEqual('String')
    expect(result.route).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-06-28T23:46:55.538Z'))
  })

  scenario('updates a ipdChat', async (scenario) => {
    const original = await ipdChat({ id: scenario.ipdChat.one.id })
    const result = await updateIpdChat({
      id: original.id,
      input: { date: '2023-06-29T23:46:55.538Z' },
    })

    expect(result.date).toEqual(new Date('2023-06-29T23:46:55.538Z'))
  })

  scenario('deletes a ipdChat', async (scenario) => {
    const original = await deleteIpdChat({
      id: scenario.ipdChat.one.id,
    })
    const result = await ipdChat({ id: original.id })

    expect(result).toEqual(null)
  })
})
