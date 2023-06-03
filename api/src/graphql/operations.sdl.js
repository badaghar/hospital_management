export const schema = gql`
  type Operation {
    id: Int!
    operation_name: String!
    date: DateTime!
    consultant_doctor: String!
    remark: String!
    result: String!
    created_at: DateTime!
    updated_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
  }

  type Query {
    operations: [Operation!]! @requireAuth
    operation(id: Int!): Operation @requireAuth
  }

  input CreateOperationInput {
    operation_name: String!
    date: DateTime!
    consultant_doctor: String!
    remark: String!
    result: String!
    ipdId: Int!
  }

  input UpdateOperationInput {
    operation_name: String
    date: DateTime
    consultant_doctor: String
    remark: String
    result: String
    ipdId: Int
  }

  type Mutation {
    createOperation(input: CreateOperationInput!): Operation! @requireAuth
    updateOperation(id: Int!, input: UpdateOperationInput!): Operation!
      @requireAuth
    deleteOperation(id: Int!): Operation! @requireAuth
  }
`
