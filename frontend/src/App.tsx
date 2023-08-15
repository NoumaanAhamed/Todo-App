import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import TodosPage from "./components/TodosPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<TodosPage />} />
          <Route path="*" element={<> Wrong Route. Go Back </>} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

// function InitState(){}

export default App;
