import React, { useEffect, useState } from 'react';
import employeeService from '../Services/EmployeeService';
import { useParams } from 'react-router-dom';

function ViewEmployee() {
    const [employee, setEmployee] = useState({
        firstName:"",
        lastName:"",
        emailId:""
    });
    const {id} = useParams();

    useEffect(() => {
        try {

            employeeService.getEmployeeById(id)
                            .then((res) => {
                                console.log(res);
                                setEmployee(res.data);
                            })
                            .catch((err) => console.log(err));
            
        } catch (err) {
            console.log(err);
        }
    },[]);


  return (
    <div className="container">
        <div className="row mt-4">
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center m-4">Employee Details</h3>
                <div className=" card-body text-center m-4">
                    <h5>First Name: <span style={{color : "gray"}}>{employee.firstName}</span></h5>
                    <h5>Last Name: <span style={{color : "gray"}}>{employee.lastName}</span></h5>
                    <h5>Email: <span style={{color : "gray"}}>{employee.emailId}</span></h5>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ViewEmployee;