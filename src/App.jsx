import { Routes, Route } from "react-router-dom";

// User Pages
import ProfileUser from "./pages/HalamanUser/ProfileUser";
import Member from "./pages/HalamanUser/Member";
import ProdukPage from "./pages/HalamanUser/ProdukPage";
import RiwayatPage from "./pages/HalamanUser/RiwayatPage";
import CartPage from "./pages/HalamanUser/CartPage";
import CheckoutPage from "./pages/HalamanUser/CheckoutPage";
import UserLayout from "./components/HalamanUser/UserLayout";
import DetailMember from "./pages/HalamanUser/DetailMember";
import HomePage from "./pages/HalamanUser/HomePage";

// Admin Pages & Layout
import AdminLayout from "./components/Admin/AdminLayout";
import DashboardPage from "./pages/Admin/DashboardPage";
import CustomerManagement from "./pages/Admin/CustomerManagement";
import OrderManagement from "./pages/Admin/OrderManagement";
import ProductManagement from "./pages/Admin/ProductManagement";
import EmailCampaigns from "./pages/Admin/EmailCampaigns";
import AddCustomer from "./pages/Admin/AddCustomer";
import CustomerSegmentation from "./pages/Admin/CustomerSegmentation";
import SalesReports from "./pages/Admin/SalesReport";
import LoyaltyProgram from "./pages/Admin/LoyaltyProgram";
import Communications from "./pages/Admin/Communication";
import DataManagementBPMN from "./pages/Admin/BPMN";
import UserManagement from "./pages/Admin/UserManagement";
import AddProduct from "./pages/Admin/AddProduct";
import ProductDetailPage from "./pages/HalamanUser/DetailProductPage";
// Import other admin pages as you create them

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/member" element={<Member />} />
        <Route path="/detail-member" element={<DetailMember />} />
        <Route path="/product" element={<ProdukPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profil" element={<ProfileUser />} />
      </Route>

      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Customer Management */}
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="customers/add" element={<AddCustomer />} />
        <Route
          path="customers/segmentation"
          element={<CustomerSegmentation />}
        />

        {/* User Management */}
        <Route path="user" element={<UserManagement />} />

        {/* Sales Force */}
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="sales-reports" element={<SalesReports />} />

        {/* Marketing */}
        <Route path="campaigns" element={<EmailCampaigns />} />
        <Route path="loyalty" element={<LoyaltyProgram />} />
        <Route path="communications" element={<Communications />} />

        {/* Customer Service */}
        <Route
          path="tickets"
          element={<div>Support Tickets - Coming Soon</div>}
        />
        <Route
          path="knowledge"
          element={<div>Knowledge Base - Coming Soon</div>}
        />

        {/* Analytics */}
        <Route
          path="analytics/customers"
          element={<div>Customer Analytics - Coming Soon</div>}
        />
        <Route
          path="analytics/sales"
          element={<div>Sales Analytics - Coming Soon</div>}
        />
        <Route
          path="analytics/campaigns"
          element={<div>Campaign Analytics - Coming Soon</div>}
        />

        {/* Settings */}
        <Route path="settings" element={<div>Settings - Coming Soon</div>} />
      </Route>

      <Route path="/bpmn" element={<DataManagementBPMN />} />
    </Routes>
  );
}

export default App;
