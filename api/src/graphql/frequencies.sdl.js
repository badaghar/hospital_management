export const schema = gql`
  type Frequency {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    frequencies: [Frequency!]! @requireAuth
    frequency(id: Int!): Frequency @requireAuth
  }

  input CreateFrequencyInput {
    name: String!
    extra: JSON
  }

  input UpdateFrequencyInput {
    name: String
    extra: JSON
  }

  type Mutation {
    createFrequency(input: CreateFrequencyInput!): Frequency! @requireAuth
    updateFrequency(id: Int!, input: UpdateFrequencyInput!): Frequency!
      @requireAuth
    deleteFrequency(id: Int!): Frequency! @requireAuth
  }
`
