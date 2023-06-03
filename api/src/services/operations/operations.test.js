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

  scenario('creates a operation', async (scenario) => {
    const result = await createOperation({
      input: {
        operation_name: 'String',
        date: '2023-06-02T13:15:32.234Z',
        consultant_doctor: 'String',
        remark: 'String',
        result: 'String',
        updated_at: '2023-06-02T13:15:32.234Z',
        ipdId: scenario.operation.two.ipdId,
      },
    })

    expect(result.operation_name).toEqual('String')
    expect(result.date).toEqual(new Date('2023-06-02T13:15:32.234Z'))
    expect(result.consultant_doctor).toEqual('String')
    expect(result.remark).toEqual('String')
    expect(result.result).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-06-02T13:15:32.234Z'))
    expect(result.ipdId).toEqual(scenario.operation.two.ipdId)
  })

  scenario('updates a operation', async (scenario) => {
    const original = await operation({
      id: scenario.operation.one.id,
    })
    const result = await updateOperation({
      id: original.id,
      input: { operation_name: 'String2' },
    })

    expect(result.operation_name).toEqual('String2')
  })

  scenario('deletes a operation', async (scenario) => {
    const original = await deleteOperation({
      id: scenario.operation.one.id,
    })
    const result = await operation({ id: original.id })

    expect(result).toEqual(null)
  })
})
