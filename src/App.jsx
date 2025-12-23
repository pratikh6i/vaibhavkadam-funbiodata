import HeroSection from './components/HeroSection';
import BiodataSection from './components/BiodataSection';
import MediaGallery from './components/MediaGallery';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero with scroll-triggered animations */}
      <HeroSection />

      {/* Biodata details */}
      <BiodataSection />

      {/* Dynamic media gallery from GitHub */}
      <MediaGallery />

      {/* Footer with social links */}
      <Footer />
    </div>
  );
}

export default App;
