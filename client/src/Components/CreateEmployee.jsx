import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../Services/EmployeeService';

function CreateEmployee() {
    const [form, setForm] = useState({
        firstName : "",
        lastName : "",
        emailId : ""
    });
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSaveClicked(true);
        if (form.firstName !== "" && form.lastName !== "" && form.emailId !== "") {
            try {
                employeeService.addEmployee(form)
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
        setForm({
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
                <h3 className="text-center m-4">Add Employee</h3>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="firstName">FirstName:</label>
                            <input type="text" name="firstName" className="form-control" placeholder="Enter FirstName..." value={form.firstName} onChange={changeHandler} />
                        </div>
                        {(isSaveClicked && form.firstName === "") && <p className="text-danger">Please Enter The FirstName</p>}
                        <div className="form-group">
                            <label htmlFor="lastName">LastName:</label>
                            <input type="text" name="lastName" className="form-control" placeholder="Enter LastName..." value={form.lastName} onChange={changeHandler} />
                        </div>
                        {(isSaveClicked && form.lastName === "") && <p className="text-danger">Please Enter The LastName</p>}
                        <div className="form-group">
                            <label htmlFor="emailId">EmailId:</label>
                            <input type="text" name="emailId" className="form-control" placeholder="Enter Email..." value={form.emailId} onChange={changeHandler} />
                        </div>
                        {(isSaveClicked && form.emailId === "") && <p className="text-danger">Please Enter The Email</p>}
                        <div className="col text-center">
                            <button type="submit" className="btn btn-success mr-1">Save</button>
                            <button type="button" className="btn btn-danger ml-1" onClick={cancelHandler}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateEmployee;