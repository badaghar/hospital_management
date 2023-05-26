export const schema = gql`
  type Composition {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    ProductToComposition: [ProductToComposition]!
  }

  type Query {
    compositions: [Composition!]! @requireAuth
    composition(id: Int!): Composition @requireAuth
  }

  input CreateCompositionInput {
    name: String!
  }

  input UpdateCompositionInput {
    name: String
  }

  type Mutation {
    createComposition(input: CreateCompositionInput!): Composition! @requireAuth
    updateComposition(id: Int!, input: UpdateCompositionInput!): Composition!
      @requireAuth
    deleteComposition(id: Int!): Composition! @requireAuth
  }
`
