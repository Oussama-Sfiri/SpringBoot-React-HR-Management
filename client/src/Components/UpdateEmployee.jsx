import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeService from '../Services/EmployeeService';

function UpdateEmployee() {
    const [employee, setEmployee] = useState({
        firstName : "",
        lastName : "",
        emailId : ""
    });
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        try {
            employeeService.getEmployeeById(id)
                           .then((res) => setEmployee(res.data))
                           .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    },[]);

    const changeHandler = (e) => {
        setEmployee({...employee, [e.target.name] : e.target.value});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsUpdateClicked(true);
        if (employee.firstName !== "" && employee.lastName !== "" && employee.emailId !== "") {
            try {
                employeeService.UpdateEmployee(id,employee)
                    .then((res) => {
                        console.log(res);
                        navigate("/employees");
                    })
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        setEmployee({
            firstName : "",
            lastName : "",
            emailId : ""
        });
        navigate("/employees");
    };

  return (
    <div className="container">
        <div className="row">
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center m-4">Update Employee</h3>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="firstName">FirstName:</label>
                            <input type="text" name="firstName" className="form-control" placeholder="Enter FirstName..." value={employee.firstName} onChange={changeHandler} />
                        </div>
                        {((isUpdateClicked) && employee.firstName === "") && <p className="text-danger">Please Enter The FirstName</p>}
                        <div className="form-group">
                            <label htmlFor="lastName">LastName:</label>
                            <input type="text" name="lastName" className="form-control" placeholder="Enter LastName..." value={employee.lastName} onChange={changeHandler} />
                        </div>
                        {((isUpdateClicked) && employee.lastName === "") && <p className="text-danger">Please Enter The LastName</p>}
                        <div className="form-group">
                            <label htmlFor="emailId">EmailId:</label>
                            <input type="text" name="emailId" className="form-control" placeholder="Enter Email..." value={employee.emailId} onChange={changeHandler} />
                        </div>
                        {((isUpdateClicked) && employee.emailId === "") && <p className="text-danger">Please Enter The Email</p>}
                        <div className="col text-center">
                            <button type="submit" className="btn btn-success mr-1">Update</button>
                            <button type="button" className="btn btn-danger ml-1" onClick={cancelHandler}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default UpdateEmployee;