import {
  distributers,
  distributer,
  createDistributer,
  updateDistributer,
  deleteDistributer,
} from './distributers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('distributers', () => {
  scenario('returns all distributers', async (scenario) => {
    const result = await distributers()

    expect(result.length).toEqual(Object.keys(scenario.distributer).length)
  })

  scenario('returns a single distributer', async (scenario) => {
    const result = await distributer({ id: scenario.distributer.one.id })

    expect(result).toEqual(scenario.distributer.one)
  })

  scenario('creates a distributer', async () => {
    const result = await createDistributer({
      input: {
        name: 'String',
        phoneNo: 'String',
        updated_at: '2023-05-21T14:27:42.305Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.phoneNo).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-05-21T14:27:42.305Z'))
  })

  scenario('updates a distributer', async (scenario) => {
    const original = await distributer({
      id: scenario.distributer.one.id,
    })
    const result = await updateDistributer({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a distributer', async (scenario) => {
    const original = await deleteDistributer({
      id: scenario.distributer.one.id,
    })
    const result = await distributer({ id: original.id })

    expect(result).toEqual(null)
  })
})
