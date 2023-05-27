import {
  doctorFees,
  doctorFee,
  createDoctorFee,
  updateDoctorFee,
  deleteDoctorFee,
} from './doctorFees'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('doctorFees', () => {
  scenario('returns all doctorFees', async (scenario) => {
    const result = await doctorFees()

    expect(result.length).toEqual(Object.keys(scenario.doctorFee).length)
  })

  scenario('returns a single doctorFee', async (scenario) => {
    const result = await doctorFee({ id: scenario.doctorFee.one.id })

    expect(result).toEqual(scenario.doctorFee.one)
  })

  scenario('creates a doctorFee', async (scenario) => {
    const result = await createDoctorFee({
      input: {
        type: 'String',
        amount: 4619083.965771264,
        userId: scenario.doctorFee.two.userId,
        updated_at: '2023-05-26T18:13:28.213Z',
      },
    })

    expect(result.type).toEqual('String')
    expect(result.amount).toEqual(4619083.965771264)
    expect(result.userId).toEqual(scenario.doctorFee.two.userId)
    expect(result.updated_at).toEqual(new Date('2023-05-26T18:13:28.213Z'))
  })

  scenario('updates a doctorFee', async (scenario) => {
    const original = await doctorFee({
      id: scenario.doctorFee.one.id,
    })
    const result = await updateDoctorFee({
      id: original.id,
      input: { type: 'String2' },
    })

    expect(result.type).toEqual('String2')
  })

  scenario('deletes a doctorFee', async (scenario) => {
    const original = await deleteDoctorFee({
      id: scenario.doctorFee.one.id,
    })
    const result = await doctorFee({ id: original.id })

    expect(result).toEqual(null)
  })
})
