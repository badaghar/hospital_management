export const schema = gql`
  type IpdOperationPayment {
    id: Int!
    operation_name: String!
    amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    ipd: Ipd!
    ipdId: Int!
  }

  type Query {
    ipdOperationPayments: [IpdOperationPayment!]! @requireAuth
    ipdOperationPayment(id: Int!): IpdOperationPayment @requireAuth
  }

  input CreateIpdOperationPaymentInput {
    operation_name: String!
    amount: Float!
    ipdId: Int!
    extra: JSON
  }

  input UpdateIpdOperationPaymentInput {
    operation_name: String
    amount: Float
    ipdId: Int
    extra: JSON
  }

  type Mutation {
    createIpdOperationPayment(
      input: [CreateIpdOperationPaymentInput]!
    ): IpdOperationPayment @requireAuth
    updateIpdOperationPayment(
      id: Int!
      input: UpdateIpdOperationPaymentInput!
    ): IpdOperationPayment! @requireAuth
    deleteIpdOperationPayment(id: Int!): IpdOperationPayment! @requireAuth
  }
`
