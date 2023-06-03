import {
  ipdPayments,
  ipdPayment,
  createIpdPayment,
  updateIpdPayment,
  deleteIpdPayment,
} from './ipdPayments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdPayments', () => {
  scenario('returns all ipdPayments', async (scenario) => {
    const result = await ipdPayments()

    expect(result.length).toEqual(Object.keys(scenario.ipdPayment).length)
  })

  scenario('returns a single ipdPayment', async (scenario) => {
    const result = await ipdPayment({ id: scenario.ipdPayment.one.id })

    expect(result).toEqual(scenario.ipdPayment.one)
  })

  scenario('creates a ipdPayment', async (scenario) => {
    const result = await createIpdPayment({
      input: {
        amount: 5635306.465903116,
        payment_mode: 'String',
        ipdId: scenario.ipdPayment.two.ipdId,
        updated_at: '2023-06-02T13:16:49.369Z',
      },
    })

    expect(result.amount).toEqual(5635306.465903116)
    expect(result.payment_mode).toEqual('String')
    expect(result.ipdId).toEqual(scenario.ipdPayment.two.ipdId)
    expect(result.updated_at).toEqual(new Date('2023-06-02T13:16:49.369Z'))
  })

  scenario('updates a ipdPayment', async (scenario) => {
    const original = await ipdPayment({
      id: scenario.ipdPayment.one.id,
    })
    const result = await updateIpdPayment({
      id: original.id,
      input: { amount: 2579661.5563632133 },
    })

    expect(result.amount).toEqual(2579661.5563632133)
  })

  scenario('deletes a ipdPayment', async (scenario) => {
    const original = await deleteIpdPayment({
      id: scenario.ipdPayment.one.id,
    })
    const result = await ipdPayment({ id: original.id })

    expect(result).toEqual(null)
  })
})
