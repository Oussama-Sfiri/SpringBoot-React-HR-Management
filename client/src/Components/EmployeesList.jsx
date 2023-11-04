import React, { useEffect, useState } from 'react';
import employeeService from '../Services/EmployeeService'; // importation de l'object "employeeService" de type "EmployeeService"
import { Link } from 'react-router-dom';

function EmployeesList() {
    const [employees, setEmployees] = useState([]);
    const [isRerender, setIsRerender] = useState(false);

    useEffect(() => {
        employeeService.getEmployees()
            .then((res) => setEmployees(res.data))
            .catch((err) => console.log(err));
    },[isRerender]);

    const deleteHandler = (id) => {
        try {
            employeeService.deleteEmployee(id)
                .then((res) => {
                    console.log(res);
                    setIsRerender(!isRerender);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    };

    const showEmployees = employees.length !== 0 && employees.map((employee) => {
        return(
            <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td className="text-center">
                    <Link className="btn btn-primary mr-2" to={`/update-employee/${employee.id}`} >Update</Link>
                    <button className="btn btn-danger ml-2 mr-2" onClick={() => deleteHandler(employee.id)}>Delete</button>
                    <Link className="btn btn-info ml-2" to={`/view-employee/${employee.id}`} >View</Link>
                </td>
            </tr>
        );
    });

  return (
    <div>
        <h2 className="text-center m-4">Employees List</h2>
        <div className="row">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {showEmployees}
                </tbody>
            </table>
            {employees.length === 0 && <p className="text-danger text-center">There is no Employees to show !</p>}
        </div>
        <div className="col text-center">
            <Link className="btn btn-success m-4" to="/add-employee">Add Employee</Link>
        </div>
        
    </div>
  );
};

export default EmployeesList;