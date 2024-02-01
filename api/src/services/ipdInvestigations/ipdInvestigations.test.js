import {
  ipdInvestigations,
  ipdInvestigation,
  createIpdInvestigation,
  updateIpdInvestigation,
  deleteIpdInvestigation,
} from './ipdInvestigations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdInvestigations', () => {
  scenario('returns all ipdInvestigations', async (scenario) => {
    const result = await ipdInvestigations()

    expect(result.length).toEqual(Object.keys(scenario.ipdInvestigation).length)
  })

  scenario('returns a single ipdInvestigation', async (scenario) => {
    const result = await ipdInvestigation({
      id: scenario.ipdInvestigation.one.id,
    })

    expect(result).toEqual(scenario.ipdInvestigation.one)
  })

  scenario('creates a ipdInvestigation', async (scenario) => {
    const result = await createIpdInvestigation({
      input: {
        lab_name: 'String',
        isWaiting: true,
        test_list: { foo: 'bar' },
        url: 'String',
        updated_at: '2024-02-01T16:41:09.903Z',
        ipdId: scenario.ipdInvestigation.two.ipdId,
      },
    })

    expect(result.lab_name).toEqual('String')
    expect(result.isWaiting).toEqual(true)
    expect(result.test_list).toEqual({ foo: 'bar' })
    expect(result.url).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-02-01T16:41:09.903Z'))
    expect(result.ipdId).toEqual(scenario.ipdInvestigation.two.ipdId)
  })

  scenario('updates a ipdInvestigation', async (scenario) => {
    const original = await ipdInvestigation({
      id: scenario.ipdInvestigation.one.id,
    })
    const result = await updateIpdInvestigation({
      id: original.id,
      input: { lab_name: 'String2' },
    })

    expect(result.lab_name).toEqual('String2')
  })

  scenario('deletes a ipdInvestigation', async (scenario) => {
    const original = await deleteIpdInvestigation({
      id: scenario.ipdInvestigation.one.id,
    })
    const result = await ipdInvestigation({ id: original.id })

    expect(result).toEqual(null)
  })
})
