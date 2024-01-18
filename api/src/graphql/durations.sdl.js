export const schema = gql`
  type Duration {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    durations: [Duration!]! @requireAuth
    duration(id: Int!): Duration @requireAuth
  }

  input CreateDurationInput {
    name: String!
    extra: JSON
  }

  input UpdateDurationInput {
    name: String
    extra: JSON
  }

  type Mutation {
    createDuration(input: CreateDurationInput!): Duration! @requireAuth
    updateDuration(id: Int!, input: UpdateDurationInput!): Duration!
      @requireAuth
    deleteDuration(id: Int!): Duration! @requireAuth
  }
`
