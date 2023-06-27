import {
  ipdOperationPayments,
  ipdOperationPayment,
  createIpdOperationPayment,
  updateIpdOperationPayment,
  deleteIpdOperationPayment,
} from './ipdOperationPayments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdOperationPayments', () => {
  scenario('returns all ipdOperationPayments', async (scenario) => {
    const result = await ipdOperationPayments()

    expect(result.length).toEqual(
      Object.keys(scenario.ipdOperationPayment).length
    )
  })

  scenario('returns a single ipdOperationPayment', async (scenario) => {
    const result = await ipdOperationPayment({
      id: scenario.ipdOperationPayment.one.id,
    })

    expect(result).toEqual(scenario.ipdOperationPayment.one)
  })

  scenario('creates a ipdOperationPayment', async (scenario) => {
    const result = await createIpdOperationPayment({
      input: {
        operation_name: 'String',
        date: '2023-06-27T02:34:32.265Z',
        operation_doctor: 'String',
        remark: 'String',
        result: 'String',
        amount: 8244629.516155759,
        updated_at: '2023-06-27T02:34:32.265Z',
        ipdId: scenario.ipdOperationPayment.two.ipdId,
      },
    })

    expect(result.operation_name).toEqual('String')
    expect(result.date).toEqual(new Date('2023-06-27T02:34:32.265Z'))
    expect(result.operation_doctor).toEqual('String')
    expect(result.remark).toEqual('String')
    expect(result.result).toEqual('String')
    expect(result.amount).toEqual(8244629.516155759)
    expect(result.updated_at).toEqual(new Date('2023-06-27T02:34:32.265Z'))
    expect(result.ipdId).toEqual(scenario.ipdOperationPayment.two.ipdId)
  })

  scenario('updates a ipdOperationPayment', async (scenario) => {
    const original = await ipdOperationPayment({
      id: scenario.ipdOperationPayment.one.id,
    })
    const result = await updateIpdOperationPayment({
      id: original.id,
      input: { operation_name: 'String2' },
    })

    expect(result.operation_name).toEqual('String2')
  })

  scenario('deletes a ipdOperationPayment', async (scenario) => {
    const original = await deleteIpdOperationPayment({
      id: scenario.ipdOperationPayment.one.id,
    })
    const result = await ipdOperationPayment({ id: original.id })

    expect(result).toEqual(null)
  })
})
