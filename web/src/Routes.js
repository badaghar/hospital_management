// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import PharmacyReportLayout from './layouts/PharmacyReportLayout/PharmacyReportLayout'
import MedicinePaymentLayout from './layouts/MedicinePaymentLayout/MedicinePaymentLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>










      <Route path="/download-purchase-medicine" page={DownloadsDownloadPurchaseMedicinePage} name="downloadPurchaseMedicine" />

      <Route path="/download-sale-medicine/{id:Int}" page={DownloadsDownloadSaleMedicinePage} name="downloadSaleMedicine" />

      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated='login' >

        <Set wrap={DashboardLayout}>

          <Route path="/signup" page={SignupPage} name="signup" />


          <Route path="/" page={HomePage} name="home" />
          <Route path="/pharmacy-report/{id:Int}" page={PharmacyReportPage} name="pharmacyReport" />

          <Route path="/view-sale-medicine/{id:Int}" page={ViewSaleMedicinePage} name="viewSaleMedicine" />
          <Set wrap={PharmacyReportLayout}>
          </Set>

          <Route path="/medicine-payment" page={MedicinePaymentPage} name="medicinePayment" />
          <Set wrap={MedicinePaymentLayout}>
          </Set>

          <Set wrap={ScaffoldLayout} title="PaymentPurchaseMedicines" titleTo="paymentPurchaseMedicines" buttonLabel="" buttonTo="paymentPurchaseMedicines">
            <Route path="/payment-purchase-medicines/new" page={PaymentPurchaseMedicineNewPaymentPurchaseMedicinePage} name="newPaymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines/{id:Int}/edit" page={PaymentPurchaseMedicineEditPaymentPurchaseMedicinePage} name="editPaymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines/{id:Int}" page={PaymentPurchaseMedicinePaymentPurchaseMedicinePage} name="paymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines" page={PaymentPurchaseMedicinePaymentPurchaseMedicinesPage} name="paymentPurchaseMedicines" />
          </Set>

          <Set wrap={ScaffoldLayout} title="SaleMedicines" titleTo="saleMedicines" buttonLabel="New SaleMedicine" buttonTo="newSaleMedicine">
            <Route path="/sale-medicines/new" page={SaleMedicineNewSaleMedicinePage} name="newSaleMedicine" />
            <Route path="/sale-medicines/{id:Int}/edit" page={SaleMedicineEditSaleMedicinePage} name="editSaleMedicine" />
            <Route path="/sale-medicines/{id:Int}" page={SaleMedicineSaleMedicinePage} name="saleMedicine" />
            <Route path="/sale-medicines" page={SaleMedicineSaleMedicinesPage} name="saleMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Medicines" titleTo="medicines" buttonLabel="Medicine Details" buttonTo="medicines">
            <Route path="/medicines/new" page={MedicineNewMedicinePage} name="newMedicine" />
            <Route path="/medicines/{id:Int}/edit" page={MedicineEditMedicinePage} name="editMedicine" />
            <Route path="/medicines/{id:Int}" page={MedicineMedicinePage} name="medicine" />
            <Route path="/medicines" page={MedicineMedicinesPage} name="medicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="PurchaseMedicines" titleTo="purchaseMedicines" buttonLabel="New PurchaseMedicine" buttonTo="newPurchaseMedicine">
            <Route path="/purchase-medicines/new" page={PurchaseMedicineNewPurchaseMedicinePage} name="newPurchaseMedicine" />
            <Route path="/purchase-medicines/{id:Int}/edit" page={PurchaseMedicineEditPurchaseMedicinePage} name="editPurchaseMedicine" />
            <Route path="/purchase-medicines/{id:Int}" page={PurchaseMedicinePurchaseMedicinePage} name="purchaseMedicine" />
            <Route path="/purchase-medicines" page={PurchaseMedicinePurchaseMedicinesPage} name="purchaseMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Products" titleTo="products" buttonLabel="New Product" buttonTo="newProduct">
            <Route path="/products/new" page={ProductNewProductPage} name="newProduct" />
            <Route path="/products/{id:Int}/edit" page={ProductEditProductPage} name="editProduct" />
            <Route path="/products/{id:Int}" page={ProductProductPage} name="product" />
            <Route path="/products" page={ProductProductsPage} name="products" />
          </Set>
          <Set wrap={ScaffoldLayout} title="ProductToCompositions" titleTo="productToCompositions" buttonLabel="New ProductToComposition" buttonTo="newProductToComposition">
            <Route path="/product-to-compositions/new" page={ProductToCompositionNewProductToCompositionPage} name="newProductToComposition" />
            <Route path="/product-to-compositions/{id:Int}/edit" page={ProductToCompositionEditProductToCompositionPage} name="editProductToComposition" />
            <Route path="/product-to-compositions/{id:Int}" page={ProductToCompositionProductToCompositionPage} name="productToComposition" />
            <Route path="/product-to-compositions" page={ProductToCompositionProductToCompositionsPage} name="productToCompositions" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Compositions" titleTo="compositions" buttonLabel="New Composition" buttonTo="newComposition">
            <Route path="/compositions/new" page={CompositionNewCompositionPage} name="newComposition" />
            <Route path="/compositions/{id:Int}/edit" page={CompositionEditCompositionPage} name="editComposition" />
            <Route path="/compositions/{id:Int}" page={CompositionCompositionPage} name="composition" />
            <Route path="/compositions" page={CompositionCompositionsPage} name="compositions" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Manufacturers" titleTo="manufacturers" buttonLabel="New Manufacturer" buttonTo="newManufacturer">
            <Route path="/manufacturers/new" page={ManufacturerNewManufacturerPage} name="newManufacturer" />
            <Route path="/manufacturers/{id:Int}/edit" page={ManufacturerEditManufacturerPage} name="editManufacturer" />
            <Route path="/manufacturers/{id:Int}" page={ManufacturerManufacturerPage} name="manufacturer" />
            <Route path="/manufacturers" page={ManufacturerManufacturersPage} name="manufacturers" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Distributers" titleTo="distributers" buttonLabel="New Distributer" buttonTo="newDistributer">
            <Route path="/distributers/new" page={DistributerNewDistributerPage} name="newDistributer" />
            <Route path="/distributers/{id:Int}/edit" page={DistributerEditDistributerPage} name="editDistributer" />
            <Route path="/distributers/{id:Int}" page={DistributerDistributerPage} name="distributer" />
            <Route path="/distributers" page={DistributerDistributersPage} name="distributers" />
          </Set>
          <Set wrap={ScaffoldLayout} title="DoctorFees" titleTo="doctorFees" buttonLabel="New DoctorFee" buttonTo="newDoctorFee">
            <Route path="/doctor-fees/new" page={DoctorFeeNewDoctorFeePage} name="newDoctorFee" />
            <Route path="/doctor-fees/{id:Int}/edit" page={DoctorFeeEditDoctorFeePage} name="editDoctorFee" />
            <Route path="/doctor-fees/{id:Int}" page={DoctorFeeDoctorFeePage} name="doctorFee" />
            <Route path="/doctor-fees" page={DoctorFeeDoctorFeesPage} name="doctorFees" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Patients" titleTo="patients" buttonLabel="New Patient" buttonTo="newPatient">
            <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
            <Route path="/patients/{id:Int}/edit" page={PatientEditPatientPage} name="editPatient" />
            <Route path="/patients/{id:Int}" page={PatientPatientPage} name="patient" />
            <Route path="/patients" page={PatientPatientsPage} name="patients" />
          </Set>
          <Route notfound page={NotFoundPage} />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
