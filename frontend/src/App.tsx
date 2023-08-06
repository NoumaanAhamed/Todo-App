import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import TodosPage from "./components/TodosPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<>Go to /todos</>} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

// function InitState(){}

export default App;
