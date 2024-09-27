import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { Pages } from "./shared/typeScriptStuff";
import AnimePage from "./pages/AnimePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MyListPage from "./pages/MyListPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.home);
  const [isTopOfThePage, setIsTopOfThePage] = useState<boolean>(true);

  // HANDLING NAV-SCROLL LOGIC

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfThePage(true);
      } else {
        setIsTopOfThePage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <Navbar
        isTopOfThePage={isTopOfThePage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="anime/:id/:animeTitle" element={<AnimePage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="my-list" element={<MyListPage />} />
        <Route path="about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
