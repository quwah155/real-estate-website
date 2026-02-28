import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center pt-24"
                style={{ background: 'var(--bg-primary)' }}>
                <p className="text-6xl font-bold text-[#C9A84C] mb-4">404</p>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Page Not Found</h2>
                <p className="mb-8" style={{ color: 'var(--text-muted)' }}>The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-[#C9A84C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A0822A] transition-colors">
                  Go Home
                </a>
              </div>
            } />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
