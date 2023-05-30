export const standard = defineScenario({
  paymentPurchaseMedicine: {
    one: {
      data: {
        total: 3196542.4935251498,
        balance: 1180455.2879618213,
        paid: 2195211.225533622,
        method: 'String',
        remark: 'String',
        updated_at: '2023-05-30T11:20:36.671Z',
        purchaseMedicine: {
          create: {
            invoiceNo: 'String222081',
            date: '2023-05-30T11:20:36.671Z',
            medicine: { foo: 'bar' },
            total: 1845658.1057900002,
            discount: 3518004.845568783,
            sgst: 5824028.334174174,
            cgst: 8607619.349527061,
            grand_total: 8695901.640067851,
            updated_at: '2023-05-30T11:20:36.671Z',
            did: {
              create: {
                name: 'String',
                phoneNo: 'String',
                updated_at: '2023-05-30T11:20:36.671Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        total: 9907753.578743419,
        balance: 624452.4403127882,
        paid: 977514.2084538158,
        method: 'String',
        remark: 'String',
        updated_at: '2023-05-30T11:20:36.671Z',
        purchaseMedicine: {
          create: {
            invoiceNo: 'String7996991',
            date: '2023-05-30T11:20:36.671Z',
            medicine: { foo: 'bar' },
            total: 6050681.7145448765,
            discount: 6348681.526371947,
            sgst: 9796517.216759667,
            cgst: 708953.2408435507,
            grand_total: 7394057.296783301,
            updated_at: '2023-05-30T11:20:36.671Z',
            did: {
              create: {
                name: 'String',
                phoneNo: 'String',
                updated_at: '2023-05-30T11:20:36.671Z',
              },
            },
          },
        },
      },
    },
  },
})
