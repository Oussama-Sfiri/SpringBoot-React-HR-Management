package com.emplmanage.backendspringboot.repository;

import com.emplmanage.backendspringboot.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // alors on a creer une repository dedié a la table Employee et ce repository herite de "JpaRepository" (on donne à cette repo le nom de l'entité ou table dans ce cas c'est "Employee" et on donne aussi le type du cle primaire dans ce cas c'est "Long" car on a declarer l'id comme Long) cette repository contient beaucoup de methode CRUD qui sont predefinies comme "findAll, findById, ..." alors il suffit de faure un extend ou heritage de cette Interface ou repos pour pouvoir utiliser ces methodes
}
