package com.idte.rest;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.idte.rest.data.Admin;
import com.idte.rest.data.AdminRepository;
import com.idte.rest.data.Privilege;
import com.idte.rest.data.PrivilegeRepository;
import com.idte.rest.data.Role;
import com.idte.rest.data.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping
public class AdminController {
  @Autowired
  private AdminRepository userRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private PrivilegeRepository privilegeRepository;

  @GetMapping(value = "/initializeAdmins")
  public Object test() {
    Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
    Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

    List<Privilege> adminPrivileges = Arrays.asList(readPrivilege, writePrivilege);        
    createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
    createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));

    Role adminRole = roleRepository.findByName("ROLE_ADMIN");
    Admin user = new Admin();
    user.setUsername("Test");
    user.setPassword("test");
    user.setEmail("test@test.com");
    user.setRoles(Arrays.asList(adminRole));
    user.setEnabled(true);
    System.out.println("Saving new admin: " + user);
    userRepository.save(user);

    System.out.println(userRepository.findAll());

    return "Good";
  }

  @GetMapping(value = "/admins/all")
  public List<Admin> getAdmins() {
    return userRepository.findAll();
  }

  @GetMapping(value = "/admins")
  public Object getAdmin(@RequestBody Map<String, String> json) {
    Admin find = new Admin();
    if(json.get("id") != null) {
      try {
        find.setId(Long.parseLong(json.get("id")));
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    Example<Admin> example = Example.of(find);
    Admin admin = userRepository.findOne(example).orElse(null);

    if(admin == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(admin, HttpStatus.OK);
  }

  @PostMapping(value = "/admins")
  public Object postAdmin(@RequestBody Map<String, String> json) {
    Admin newAdmin = new Admin();
    String name = json.get("name");
    String email = json.get("email");
    String pass = json.get("pass"); // TODO: PASSWORD SECURITY
    // TODO: SUPERADMINS?

    newAdmin.setUsername(name);
    newAdmin.setEmail(email);
    newAdmin.setPassword(pass);

    try {
      return new ResponseEntity<>(userRepository.save(newAdmin), HttpStatus.OK);
    }
    catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping(value = "/admins")
  public Object deleteAdmin(@RequestBody Map<String, String> json) {
    Admin find = new Admin();
    if(json.get("id") != null) {
      try {
        find.setId(Long.parseLong(json.get("id")));
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    Example<Admin> example = Example.of(find);
    Admin admin = userRepository.findOne(example).orElse(null);

    if(admin == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    userRepository.delete(admin);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @Transactional
  private Privilege createPrivilegeIfNotFound(String name) {

      Privilege privilege = privilegeRepository.findByName(name);
      if (privilege == null) {
          privilege = new Privilege(name);
          System.out.println("Creating privilege: " + privilege);
          privilegeRepository.save(privilege);
      }
      return privilege;
  }

  @Transactional
  private Role createRoleIfNotFound(
    String name, Collection<Privilege> privileges) {

      Role role = roleRepository.findByName(name);
      if (role == null) {
          role = new Role(name);
          role.setPrivileges(privileges);
          System.out.println("Creating role: " + role);
          roleRepository.save(role);
      }
      return role;
  }
  
}