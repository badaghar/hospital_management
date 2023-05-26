export const schema = gql`
  type Product {
    id: Int!
    name: String!
    mid: Manufacturer!
    manufacturerId: Int!
    created_at: DateTime!
    updated_at: DateTime!
    Medicine: [Medicine]!
    ProductToComposition: [ProductToComposition]!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
  }

  input CreateProductInput {
    name: String!
    manufacturerId: Int!
    compositionList: [Int]!
  }

  input UpdateProductInput {
    name: String
    manufacturerId: Int
    compositionList: [Int]
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`
