export const standard = defineScenario({
  complaints: {
    one: {
      data: {
        note: 'String',
        updated_at: '2023-12-11T07:59:34.488Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-12-11T07:59:34.488Z',
            updated_at: '2023-12-11T07:59:34.488Z',
            paid_amount: 1358351.9681928614,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 932356,
                updated_at: '2023-12-11T07:59:34.488Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updated_at: '2023-12-11T07:59:34.488Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-12-11T07:59:34.488Z',
            updated_at: '2023-12-11T07:59:34.488Z',
            paid_amount: 3904123.4297763873,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 8943090,
                updated_at: '2023-12-11T07:59:34.488Z',
              },
            },
          },
        },
      },
    },
  },
})
