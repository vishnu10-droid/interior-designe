import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage, { ServiceDetail } from "./pages/Services";
import ProjectsPage, { ProjectDetail } from "./pages/Projects";
import { GalleryPage, ReviewsPage, ContactPage, NotFound } from "./pages/Misc";
import DashboardLayout from "./dashboard/DashboardLayout";
import { DashHome, DashProjects, DashServices, DashGallery, DashLeads, DashReviews, DashMessages, DashSettings } from "./dashboard/pages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/services/:id" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
        <Route path="/projects/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><ReviewsPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashHome />} />
          <Route path="projects" element={<DashProjects />} />
          <Route path="services" element={<DashServices />} />
          <Route path="gallery" element={<DashGallery />} />
          <Route path="leads" element={<DashLeads />} />
          <Route path="reviews" element={<DashReviews />} />
          <Route path="messages" element={<DashMessages />} />
          <Route path="settings" element={<DashSettings />} />
        </Route>
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
