export const schema = gql`
  type ProductToComposition {
    id: Int!
    cid: Composition!
    compositionId: Int!
    pid: Product!
    productId: Int!
  }

  type Query {
    productToCompositions: [ProductToComposition!]! @requireAuth
    productToComposition(id: Int!): ProductToComposition @requireAuth
  }

  input CreateProductToCompositionInput {
    compositionId: Int!
    productId: Int!
  }

  input UpdateProductToCompositionInput {
    compositionId: Int
    productId: Int
  }

  type Mutation {
    createProductToComposition(
      input: CreateProductToCompositionInput!
    ): ProductToComposition! @requireAuth
    updateProductToComposition(
      id: Int!
      input: UpdateProductToCompositionInput!
    ): ProductToComposition! @requireAuth
    deleteProductToComposition(id: Int!): ProductToComposition! @requireAuth
  }
`
