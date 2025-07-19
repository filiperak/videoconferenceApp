import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Call from "./components/callComponents/Call";

function App() {

  return (
    <>
      <Router>
        <Routes>
        
        <Route path="/call" element={<Call/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
