import { opds, opd, createOpd, updateOpd, deleteOpd } from './opds'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('opds', () => {
  scenario('returns all opds', async (scenario) => {
    const result = await opds()

    expect(result.length).toEqual(Object.keys(scenario.opd).length)
  })

  scenario('returns a single opd', async (scenario) => {
    const result = await opd({ id: scenario.opd.one.id })

    expect(result).toEqual(scenario.opd.one)
  })

  scenario('creates a opd', async (scenario) => {
    const result = await createOpd({
      input: {
        consultant_doctor: 'String',
        charges: { foo: 'bar' },
        paymentMode: 8968737.243419833,
        amount: 7123905.309014322,
        updated_at: '2023-06-02T13:15:07.454Z',
        patientId: scenario.opd.two.patientId,
      },
    })

    expect(result.consultant_doctor).toEqual('String')
    expect(result.charges).toEqual({ foo: 'bar' })
    expect(result.paymentMode).toEqual(8968737.243419833)
    expect(result.amount).toEqual(7123905.309014322)
    expect(result.updated_at).toEqual(new Date('2023-06-02T13:15:07.454Z'))
    expect(result.patientId).toEqual(scenario.opd.two.patientId)
  })

  scenario('updates a opd', async (scenario) => {
    const original = await opd({ id: scenario.opd.one.id })
    const result = await updateOpd({
      id: original.id,
      input: { consultant_doctor: 'String2' },
    })

    expect(result.consultant_doctor).toEqual('String2')
  })

  scenario('deletes a opd', async (scenario) => {
    const original = await deleteOpd({ id: scenario.opd.one.id })
    const result = await opd({ id: original.id })

    expect(result).toEqual(null)
  })
})
