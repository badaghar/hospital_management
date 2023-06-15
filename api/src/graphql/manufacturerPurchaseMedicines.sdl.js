export const schema = gql`
  type ManufacturerPurchaseMedicine {
    id: Int!
    pid: Product!
    productId: Int!
    batch: String!
    paid_qty: Int!
    free_qty: Int!
    pack: Int!
    exp: DateTime!
    mrp: Float!
    rate: Float!
    dis: Float!
    sgst: Float!
    cgst: Float!
    amount: Float!
    net_amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    manufacturerPurchaseMedicines: [ManufacturerPurchaseMedicine!]! @requireAuth
    manufacturerPurchaseMedicine(id: Int!): ManufacturerPurchaseMedicine
      @requireAuth
  }

  input CreateManufacturerPurchaseMedicineInput {
    productId: Int!
    batch: String!
    paid_qty: Int!
    free_qty: Int!
    pack: Int!
    exp: DateTime!
    mrp: Float!
    rate: Float!
    dis: Float!
    sgst: Float!
    cgst: Float!
    amount: Float!
    net_amount: Float!
  }

  input UpdateManufacturerPurchaseMedicineInput {
    productId: Int
    batch: String
    paid_qty: Int
    free_qty: Int
    pack: Int
    exp: DateTime
    mrp: Float
    rate: Float
    dis: Float
    sgst: Float
    cgst: Float
    amount: Float
    net_amount: Float
  }

  type Mutation {
    createManufacturerPurchaseMedicine(
      input: CreateManufacturerPurchaseMedicineInput!
    ): ManufacturerPurchaseMedicine! @requireAuth
    updateManufacturerPurchaseMedicine(
      id: Int!
      input: UpdateManufacturerPurchaseMedicineInput!
    ): ManufacturerPurchaseMedicine! @requireAuth
    deleteManufacturerPurchaseMedicine(id: Int!): ManufacturerPurchaseMedicine!
      @requireAuth
  }
`
