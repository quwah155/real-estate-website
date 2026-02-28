import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const MainLayout = ({ children }) => {
    const { isDark } = useTheme();
    return (
        <div className={`min-h-screen flex flex-col${isDark ? ' dark' : ''}`}
            style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default MainLayout;
