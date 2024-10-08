import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Root from './routes/Root';
import Tasks from "./routes/Tasks";
import ErrorPage from "./routes/ErrorPage";


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Dashboard />} />
            <Route path="Tasks" element={<Tasks />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/* Erillaisia tyylejä määritellä React komponentteja / funktioita
  function App() {}
  const App = () => {}
  export default function App() {}
*/
