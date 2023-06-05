export const schema = gql`
  type Floor {
    id: Int!
    floor_name: String!
    created_at: DateTime!
    updated_at: DateTime!
    Bed: [Bed]!
  }

  type Query {
    floors: [Floor!]! @requireAuth
    floor(id: Int!): Floor @requireAuth
  }

  input CreateFloorInput {
    floor_name: String!
  }

  input UpdateFloorInput {
    floor_name: String
  }

  type Mutation {
    createFloor(input: CreateFloorInput!): Floor! @requireAuth
    updateFloor(id: Int!, input: UpdateFloorInput!): Floor! @requireAuth
    deleteFloor(id: Int!): Floor! @requireAuth
  }
`
