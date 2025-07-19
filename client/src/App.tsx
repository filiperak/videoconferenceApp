import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Call from "./components/callComponents/Call";
import Navbar from "./components/navbar/Navbar";

function App() {

  return (
    <main className="app-container">
      <Router>
        <Navbar/>
        <Routes>
        

        /*routes */
        <Route path="/call" element={<Call/>}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
