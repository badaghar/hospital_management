export const schema = gql`
  type PurchaseMedicine {
    id: Int!
    invoiceNo: String!
    did: Distributer!
    distributerId: Int!
    date: DateTime!
    medicine: JSON!
    return: JSON
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }

  # pharmacy Report
  type DistributerReportResponse {
  data: [PurchaseMedicine]!
  totalSum: Float!
}
  type DistributerReportResponse2 {
  data: [PurchaseMedicine]!
  data2: [PaymentPurchaseMedicine]!
  totalSum: Float!
}
  type ManufacturerReportResponse {
  data: [ManufacturerPurchaseMedicine]!
  totalSum: Float!
  gstSum: Float!
}
  type SaleReport {
    data: [SaleMedicine]!
    totalSum: Float!
  }

  type PaymentReport {
    data: [PaymentPurchaseMedicine]!
    totalSum: Float!
  }
  type ReturnMedicineReport{
    data: [ReturnMedicine]!
    totalSum: Float!
  }

  type IpdReport {
    data: [Ipd]!
    totalSum: Float!
  }
  type OpdReport {
    data: [Opd]!
    totalSum: Float!
  }





  type Query {
    purchaseMedicines: [PurchaseMedicine!]! @requireAuth
    purchaseMedicine(id: Int!): PurchaseMedicine @requireAuth
    checkInvoiceNumber(invoiceNo:String!): [PurchaseMedicine]! @requireAuth
    # pharmacy Report
    distributersReport(id:Int!,startDate:String!,endDate:String!): DistributerReportResponse2! @requireAuth
    manufacturerReport(id:Int!,startDate:String!,endDate:String!): ManufacturerReportResponse! @requireAuth
    purchaseReport(startDate:String!,endDate:String!): DistributerReportResponse! @requireAuth
    saleReport(startDate:String!,endDate:String!) : SaleReport! @requireAuth
    returnMedicinesReport(startDate:String!,endDate:String!) : ReturnMedicineReport! @requireAuth
    pharmacyPayment(id:Int!,startDate:String!,endDate:String!): PaymentReport! @requireAuth
    # hospital Report
    ipdReport(startDate:String!,endDate:String!,type: String!) : IpdReport! @requireAuth
    opdReport(startDate:String!,endDate:String!) : OpdReport! @requireAuth
    pharmacyExpiryMedicineReport: [Medicine]! @requireAuth
    # Medicine show bill
    medicineHistory(time:DateTime!,productId:Int!,batch:String!): PurchaseMedicine! @requireAuth

  }

  input CreatePurchaseMedicineInput {
    invoiceNo: String!
    distributerId: Int!
    date: DateTime!
    medicine: JSON!
    return: JSON
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    permedicine: [CreateMedicineInput]!
    newperMedicineManu: [CreateManufacturerPurchaseMedicineInput]!
  }
  input AddPurchaseMedicineInput {
    invoiceNo: String
    distributerId: Int
    date: DateTime
    medicine: JSON
    return: JSON
    total: Float
    discount: Float
    sgst: Float
    cgst: Float
    grand_total: Float
    permedicine: [CreateMedicineInput]
    newperMedicineManu: [CreateManufacturerPurchaseMedicineInput]
  }

  input UpdatePurchaseMedicineInput {
    invoiceNo: String
    distributerId: Int
    date: DateTime
    medicine: JSON
    total: Float
    discount: Float
    sgst: Float
    cgst: Float
    grand_total: Float
    permedicine: [CreateMedicineInput]
  }


  type Mutation {
    createPurchaseMedicine(
      input: CreatePurchaseMedicineInput!
    ): PurchaseMedicine! @requireAuth
    updatePurchaseMedicine(
      id: Int!
      input: UpdatePurchaseMedicineInput!
    ): PurchaseMedicine! @requireAuth
    addPurchaseMedicine(
      id: Int!
      input: AddPurchaseMedicineInput!
    ): PurchaseMedicine! @requireAuth
    deletePurchaseMedicine(id: Int!): PurchaseMedicine! @requireAuth

  }
`
