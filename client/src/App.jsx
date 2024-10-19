import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
