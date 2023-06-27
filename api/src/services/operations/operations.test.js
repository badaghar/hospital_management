import {
  operations,
  operation,
  createOperation,
  updateOperation,
  deleteOperation,
} from './operations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('operations', () => {
  scenario('returns all operations', async (scenario) => {
    const result = await operations()

    expect(result.length).toEqual(Object.keys(scenario.operation).length)
  })

  scenario('returns a single operation', async (scenario) => {
    const result = await operation({ id: scenario.operation.one.id })

    expect(result).toEqual(scenario.operation.one)
  })

  scenario('creates a operation', async () => {
    const result = await createOperation({
      input: { name: 'String3727594', updated_at: '2023-06-27T08:57:53.824Z' },
    })

    expect(result.name).toEqual('String3727594')
    expect(result.updated_at).toEqual(new Date('2023-06-27T08:57:53.824Z'))
  })

  scenario('updates a operation', async (scenario) => {
    const original = await operation({
      id: scenario.operation.one.id,
    })
    const result = await updateOperation({
      id: original.id,
      input: { name: 'String36697892' },
    })

    expect(result.name).toEqual('String36697892')
  })

  scenario('deletes a operation', async (scenario) => {
    const original = await deleteOperation({
      id: scenario.operation.one.id,
    })
    const result = await operation({ id: original.id })

    expect(result).toEqual(null)
  })
})
