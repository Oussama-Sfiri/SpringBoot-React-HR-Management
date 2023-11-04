import axios from 'axios';

const GET_EMPLOYEES_API_BASE_URL = "http://localhost:8080/api/v1/employees";
const ADD_EMPLOYEE_URL_BASE = "http://localhost:8080/api/v1/create-employee";
const GET_EMPLOYEE_BY_ID_URL_BASE = `http://localhost:8080/api/v1/employees`;
const UPDATE_EMPLOYEE_URL_BASE = `http://localhost:8080/api/v1/update-employee`;
const DELETE_EMPLOYEE_URL_BASE = `http://localhost:8080/api/v1/delete-employee`;

class EmployeeService{

    async getEmployees(){
        const promise = await axios.get(GET_EMPLOYEES_API_BASE_URL);
        return promise;
    };

    async addEmployee(employeeData){
        const promise = await axios.post(ADD_EMPLOYEE_URL_BASE,employeeData);
        return promise;
    };

    async getEmployeeById(id){
        const promise = await axios.get(`${GET_EMPLOYEE_BY_ID_URL_BASE}/${id}`);
        return promise;
    };

    async UpdateEmployee(id,employeeDetails){
        const promise = await axios.put(`${UPDATE_EMPLOYEE_URL_BASE}/${id}`,employeeDetails);
        return promise;
    };

    async deleteEmployee(id){
        const promise = await axios.delete(`${DELETE_EMPLOYEE_URL_BASE}/${id}`);
        return promise;
    };

};

const employeeService = new EmployeeService()

export default employeeService;