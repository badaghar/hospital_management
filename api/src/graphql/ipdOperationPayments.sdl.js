export const schema = gql`
  type IpdOperationPayment {
    id: Int!
    operation_name: String!
    date: DateTime!
    operation_doctor: String!
    remark: String!
    result: String!
    amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
  }

  type Query {
    ipdOperationPayments: [IpdOperationPayment!]! @requireAuth
    ipdOperationPayment(id: Int!): IpdOperationPayment @requireAuth
  }

  input CreateIpdOperationPaymentInput {
    operation_name: String!
    date: DateTime!
    operation_doctor: String!
    remark: String!
    result: String!
    amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
    ipdId: Int!
  }

  input UpdateIpdOperationPaymentInput {
    operation_name: String
    date: DateTime
    operation_doctor: String
    remark: String
    result: String
    amount: Float
    created_at: DateTime
    updated_at: DateTime
    ipdId: Int
  }

  type Mutation {
    createIpdOperationPayment(
      input: CreateIpdOperationPaymentInput!
    ): IpdOperationPayment! @requireAuth
    updateIpdOperationPayment(
      id: Int!
      input: UpdateIpdOperationPaymentInput!
    ): IpdOperationPayment! @requireAuth
    deleteIpdOperationPayment(id: Int!): IpdOperationPayment! @requireAuth
  }
`
