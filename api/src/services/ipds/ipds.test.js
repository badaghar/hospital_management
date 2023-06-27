import { ipds, ipd, createIpd, updateIpd, deleteIpd } from './ipds'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipds', () => {
  scenario('returns all ipds', async (scenario) => {
    const result = await ipds()

    expect(result.length).toEqual(Object.keys(scenario.ipd).length)
  })

  scenario('returns a single ipd', async (scenario) => {
    const result = await ipd({ id: scenario.ipd.one.id })

    expect(result).toEqual(scenario.ipd.one)
  })

  scenario('creates a ipd', async (scenario) => {
    const result = await createIpd({
      input: {
        patientId: scenario.ipd.two.patientId,
        consultant_doctor: 'String',
        date_of_admission: '2023-06-27T09:17:40.826Z',
        updated_at: '2023-06-27T09:17:40.826Z',
        paid_amount: 8367683.144835163,
        patientType: 'String',
      },
    })

    expect(result.patientId).toEqual(scenario.ipd.two.patientId)
    expect(result.consultant_doctor).toEqual('String')
    expect(result.date_of_admission).toEqual(
      new Date('2023-06-27T09:17:40.826Z')
    )
    expect(result.updated_at).toEqual(new Date('2023-06-27T09:17:40.826Z'))
    expect(result.paid_amount).toEqual(8367683.144835163)
    expect(result.patientType).toEqual('String')
  })

  scenario('updates a ipd', async (scenario) => {
    const original = await ipd({ id: scenario.ipd.one.id })
    const result = await updateIpd({
      id: original.id,
      input: { consultant_doctor: 'String2' },
    })

    expect(result.consultant_doctor).toEqual('String2')
  })

  scenario('deletes a ipd', async (scenario) => {
    const original = await deleteIpd({ id: scenario.ipd.one.id })
    const result = await ipd({ id: original.id })

    expect(result).toEqual(null)
  })
})
