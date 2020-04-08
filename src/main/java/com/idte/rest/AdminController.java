package com.idte.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.idte.rest.data.Admin;
import com.idte.rest.data.AdminRepository;
import com.idte.rest.data.Error;
import com.idte.rest.data.Privilege;
import com.idte.rest.data.PrivilegeRepository;
import com.idte.rest.data.Role;
import com.idte.rest.data.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
  @Autowired
  private PasswordEncoder passwordEncoder;

  @GetMapping(value = "/initializeAdmins")
  public Object test() {
    Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
    Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

    List<Privilege> adminPrivileges = Arrays.asList(readPrivilege, writePrivilege);        
    createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
    createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));

    Role adminRole = roleRepository.findByName("ROLE_ADMIN");
    Admin user = new Admin();
    user.setUsername("admin");
    user.setPassword(passwordEncoder.encode("password"));
    user.setEmail("test@test.com");
    user.setRoles(Arrays.asList(adminRole));
    user.setEnabled(true);

    userRepository.save(user);

    return "Created temporary admin account";
  }

  @GetMapping(value = "/admin/admins/all")
  public List<Admin> getAdmins() {
    return userRepository.findAll();
  }

  @GetMapping(value = "/admin/admins")
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

  @PostMapping(value = "/admin/admins")
  public Object postAdmin(@RequestBody Map<String, String> json) {
    try {
      Admin newAdmin = new Admin();
      String name = json.get("name");
      String email = json.get("email");
      String pass = json.get("pass");
  
      Role adminRole = roleRepository.findByName("ROLE_ADMIN");
      newAdmin.setRoles(Arrays.asList(adminRole));
  
      newAdmin.setUsername(name);
      newAdmin.setEmail(email);
      newAdmin.setPassword(passwordEncoder.encode(pass));
      newAdmin.setEnabled(true);

      // Validation time
      List<Error> errors = new ArrayList<>();
      if(userRepository.findByUsername(newAdmin.getUsername()) != null) {
        errors.add(new Error("Username '" + newAdmin.getUsername() + "' already in use!"));
      }
      if(userRepository.findByEmail(newAdmin.getEmail()) != null) {
        errors.add(new Error("Email '" + newAdmin.getEmail() + "' already in use!"));
      }

      if(errors.size() > 0) {
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }
      else {
        return new ResponseEntity<>(userRepository.save(newAdmin), HttpStatus.OK);
      }
    }
    catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping(value = "/admin/admins")
  public Object deleteAdmin(@RequestBody Map<String, String> json) {
    Admin admin = null;
    if(json.get("id") != null) {
      try {
        admin = userRepository.findById(Long.parseLong(json.get("id"))).orElse(null);
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }



    if(admin == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    userRepository.delete(admin);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping(value = "/navbar")
  public Object initNavbar() {
    Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
    String role = "NONE";
    for(int i = 0; i < authorities.size(); i++) {
      role = authorities.toArray()[i] + "";
    }
    return new ResponseEntity<>(role, HttpStatus.OK);
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