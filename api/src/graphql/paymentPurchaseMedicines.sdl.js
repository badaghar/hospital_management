export const schema = gql`
  type PaymentPurchaseMedicine {
    id: Int!
    purchaseMedicine: PurchaseMedicine!
    purchaseMedicineId: Int!
    total: Float!
    balance: Float!
    paid: Float!
    method: String!
    remark: String!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    paymentPurchaseMedicines: [PaymentPurchaseMedicine!]! @requireAuth
    paymentPurchaseMedicine(id: Int!): PaymentPurchaseMedicine @requireAuth
  }

  input CreatePaymentPurchaseMedicineInput {
    purchaseMedicineId: Int!
    total: Float!
    balance: Float!
    paid: Float!
    method: String!
    remark: String!
  }

  input UpdatePaymentPurchaseMedicineInput {
    purchaseMedicineId: Int
    total: Float
    balance: Float
    paid: Float
    method: String
    remark: String
  }

  type Mutation {
    createPaymentPurchaseMedicine(
      input: CreatePaymentPurchaseMedicineInput!
    ): PaymentPurchaseMedicine! @requireAuth
    updatePaymentPurchaseMedicine(
      id: Int!
      input: UpdatePaymentPurchaseMedicineInput!
    ): PaymentPurchaseMedicine! @requireAuth
    deletePaymentPurchaseMedicine(id: Int!): PaymentPurchaseMedicine!
      @requireAuth
  }
`
