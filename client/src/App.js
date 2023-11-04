import './App.css';
import { Route, Routes } from 'react-router-dom';
import EmployeesList from './Components/EmployeesList';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CreateEmployee from './Components/CreateEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import ViewEmployee from './Components/ViewEmployee';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header/>
      <div className="container">
        {/*<Switch></Switch> Il est utilisé pour rendre exclusivement un seul composant Route à la fois. Cela signifie que parmi plusieurs <Route> (routes) définies, une seule sera rendue à un moment donné */}
        <Routes>
          <Route path="/" exact element={<EmployeesList/>}></Route>
          <Route path="/employees" exact element={<EmployeesList/>}></Route>
          <Route path='/update-employee/:id' exact element={<UpdateEmployee/>}></Route>
          <Route path="/add-employee" exact element={<CreateEmployee/>}></Route>
          <Route path='/view-employee/:id' exact element={<ViewEmployee/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
