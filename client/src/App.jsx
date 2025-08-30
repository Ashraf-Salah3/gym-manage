import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/Login';
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Home from './pages/Home';
import AdminRegister from './pages/admin/Register';
import MemberLogin from "./pages/member/Login";
import ManageMembers from "./pages/admin/ManageMembers";
import Payments from "./pages/admin/Payments";
import MemberDashboard from "./pages/member/Dashboard"; // Make sure this file exists
import MemberLayout from "./layouts/MemberLayout";
import ToDo from "./pages/member/ToDo";
import Reminders from "./pages/member/Reminders";
import Announcements from "./pages/admin/Announcements";
import MemberAnnouncements from "./pages/member/Announcements";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add this line */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/member/login" element={<MemberLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<ManageMembers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="announcements" element={<Announcements />} />
          {/* Later: Add nested routes here */}
        </Route>
        <Route path="/member" element={<MemberLayout />}>
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="todo" element={<ToDo />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="announcements" element={<MemberAnnouncements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
