import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TZNew from './pages/TZNew';
import Landing from './pages/Landing';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tz" element={<TZNew />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена. <Link to="/">На главную</Link></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;