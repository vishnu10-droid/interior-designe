import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import OfferPopup from "./components/OfferPopup";
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage, { ServiceDetail } from "./pages/Services";
import { ContactPage, NotFound } from "./pages/Misc";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import BlogPage from "./pages/BlogPage";
import DashboardLayout from "./dashboard/DashboardLayout";
import { DashHome, DashProjects, DashServices, DashGallery, DashLeads, DashReviews, DashMessages, DashSettings } from "./dashboard/pages";
import { allKeywords } from "./data/seo";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return undefined;
    }
    // Hash links (Projects / Blog in the navbar) may point to sections on the
    // home page that have just mounted, so scroll after the next paint.
    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
      <OfferPopup />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="keywords"]');
    if (meta) meta.setAttribute("content", allKeywords.join(", "));
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/services/:id" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/products/:slug" element={<PublicLayout><ProductDetails /></PublicLayout>} />
        <Route path="/brands" element={<PublicLayout><Brands /></PublicLayout>} />
        <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
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
