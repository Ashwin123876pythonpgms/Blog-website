import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import SingleBlog from './components/SingleBlog';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route
              path='/blog/:id'
              element={<SingleBlog />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

