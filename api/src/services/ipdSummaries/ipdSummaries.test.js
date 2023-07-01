import {
  ipdSummaries,
  ipdSummary,
  createIpdSummary,
  updateIpdSummary,
  deleteIpdSummary,
} from './ipdSummaries'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdSummaries', () => {
  scenario('returns all ipdSummaries', async (scenario) => {
    const result = await ipdSummaries()

    expect(result.length).toEqual(Object.keys(scenario.ipdSummary).length)
  })

  scenario('returns a single ipdSummary', async (scenario) => {
    const result = await ipdSummary({ id: scenario.ipdSummary.one.id })

    expect(result).toEqual(scenario.ipdSummary.one)
  })

  scenario('creates a ipdSummary', async (scenario) => {
    const result = await createIpdSummary({
      input: {
        ipdId: scenario.ipdSummary.two.ipdId,
        summary: { foo: 'bar' },
        updated_at: '2023-07-01T13:32:41.716Z',
      },
    })

    expect(result.ipdId).toEqual(scenario.ipdSummary.two.ipdId)
    expect(result.summary).toEqual({ foo: 'bar' })
    expect(result.updated_at).toEqual(new Date('2023-07-01T13:32:41.716Z'))
  })

  scenario('updates a ipdSummary', async (scenario) => {
    const original = await ipdSummary({
      id: scenario.ipdSummary.one.id,
    })
    const result = await updateIpdSummary({
      id: original.id,
      input: { summary: { foo: 'baz' } },
    })

    expect(result.summary).toEqual({ foo: 'baz' })
  })

  scenario('deletes a ipdSummary', async (scenario) => {
    const original = await deleteIpdSummary({
      id: scenario.ipdSummary.one.id,
    })
    const result = await ipdSummary({ id: original.id })

    expect(result).toEqual(null)
  })
})
