export const schema = gql`
  type IpdPayment {
    id: Int!
    amount: Float!
    payment_mode: String!
    ipd: Ipd!
    ipdId: Int!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    ipdPayments: [IpdPayment!]! @requireAuth
    ipdPayment(id: Int!): IpdPayment @requireAuth
  }

  input CreateIpdPaymentInput {
    amount: Float!
    payment_mode: String!
    ipdId: Int!
  }

  input UpdateIpdPaymentInput {
    amount: Float
    payment_mode: String
    ipdId: Int
  }

  type Mutation {
    createIpdPayment(input: CreateIpdPaymentInput!): IpdPayment! @requireAuth
    updateIpdPayment(id: Int!, input: UpdateIpdPaymentInput!): IpdPayment!
      @requireAuth
    deleteIpdPayment(id: Int!): IpdPayment! @requireAuth
  }
`
