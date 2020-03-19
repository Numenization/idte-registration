package com.idte.rest;

import java.util.HashSet;
import java.util.Set;

import com.idte.rest.data.Admin;
import com.idte.rest.data.AdminRepository;
import com.idte.rest.data.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  private AdminRepository adminRepository;

  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String username) {
    System.out.println(username);
    Admin admin = adminRepository.findByUsername(username);
    System.out.println(admin);
    if(admin == null) throw new UsernameNotFoundException(username);

    Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
    for(Role role: admin.getRoles()) {
      grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
    }

    return new org.springframework.security.core.userdetails.User(admin.getUsername(), admin.getPassword(), grantedAuthorities);
  }
}