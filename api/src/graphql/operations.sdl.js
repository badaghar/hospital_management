export const schema = gql`
  type Operation {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    operations: [Operation!]! @requireAuth
    operation(id: Int!): Operation @requireAuth
  }

  input CreateOperationInput {
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
  }

  input UpdateOperationInput {
    name: String
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createOperation(input: CreateOperationInput!): Operation! @requireAuth
    updateOperation(id: Int!, input: UpdateOperationInput!): Operation!
      @requireAuth
    deleteOperation(id: Int!): Operation! @requireAuth
  }
`
