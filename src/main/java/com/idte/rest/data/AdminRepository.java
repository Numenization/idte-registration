package com.idte.rest.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
    Admin findByUsername(String username);

    @Override
    void delete(Admin user);

}