import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import YouTube from "./pages/YouTube";
import Navbar from "./components/Navbar";
import Watch from "./pages/Watch";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/youtube" element={<YouTube />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
