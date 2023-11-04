package com.emplmanage.backendspringboot.controller;

import com.emplmanage.backendspringboot.exception.ResourceNotFoundException;
import com.emplmanage.backendspringboot.model.Employee;
import com.emplmanage.backendspringboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/"}) //L'annotation @CrossOrigin en Java est utilisée dans le contexte des applications Web pour configurer la gestion des autorisations CORS (Cross-Origin Resource Sharing) pour les requêtes HTTP. CORS est un mécanisme de sécurité intégré dans les navigateurs Web qui empêche les requêtes provenant d'un domaine différent (origine) d'accéder aux ressources d'un serveur à moins que le serveur ne l'autorise explicitement. Cette restriction est en place pour des raisons de sécurité, car elle aide à éviter les attaques potentielles, telles que les attaques par script intersite (XSS) et les vols de données.L'annotation @CrossOrigin est utilisée dans le cadre de la programmation côté serveur pour définir la politique CORS pour les méthodes ou les contrôleurs d'une application Spring. Voici à quoi servent les principaux attributs de cette annotation :origins: Spécifie les origines autorisées à accéder aux ressources de l'application. Vous pouvez définir un tableau d'origines autorisées. Par exemple, "http://localhost:3000/" signifie que les requêtes provenant de ce domaine sont autorisées.
@RestController
@RequestMapping("/api/v1/") // pour specifier l'URL de base pour les API qu'on va creer
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // create employee
    @PostMapping("/create-employee")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    // get employee by id
    @GetMapping("/employees/{id}") //1-@GetMapping("/employees/{id}"): Il s'agit d'une annotation Spring qui indique que cette méthode sera déclenchée lorsque l'application reçoit une requête HTTP GET à l'URL spécifiée, qui est "/employees/{id}". Le {id} est une variable de chemin qui permet de capturer la valeur de l'ID de l'employé dans l'URL. 2-public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id): Cette ligne définit la signature de la méthode. Elle indique que la méthode renverra un objet ResponseEntity contenant un objet Employee. La méthode prend un paramètre id, qui est annoté avec @PathVariable. Cela signifie que la valeur de l'ID de l'employé sera extraite de l'URL et transmise à cette méthode en tant que paramètre. 2-Employee employee = employeeRepository.findById(id): Cette ligne utilise un objet employeeRepository pour rechercher un employé dans la base de données en fonction de l'ID fourni. La méthode findById(id) renvoie un objet Optional<Employee>. Cela signifie que l'employé peut ou non être trouvé. Si l'employé n'est pas trouvé, Optional sera vide. 3-.orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with the id : "+id)): Cette partie est une manipulation d'Optional. Si l'employé n'est pas trouvé, cette ligne déclenchera une exception de type ResourceNotFoundException, avec un message indiquant que l'employé n'a pas été trouvé. Si l'employé est trouvé, l'objet Employee sera extrait. 4-return ResponseEntity.ok(employee): Si l'employé est trouvé, cette ligne crée une réponse HTTP OK (code 200) contenant l'objet Employee. Cela signifie que l'employé a été trouvé avec succès, et l'objet Employee est renvoyé en réponse.
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                                    .orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with the id : "+id));
        return ResponseEntity.ok(employee);
    }

    // update employee by id
    @PutMapping("update-employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with the id : "+id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        employeeRepository.save(employee); // hna maghadich itbedel l'id car mabedelnahch donc ghadi ib9a nefss l'id li kan 9bel

        return ResponseEntity.ok(employee);
    }

    // delete employee by id
    @DeleteMapping("/delete-employee/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with the id : " + id));
        employeeRepository.deleteById(id);
        return ResponseEntity.ok(employee);
    }

}
