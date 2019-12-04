package com.idte.rest.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.idte.rest.data.Supplier;

@RepositoryRestResource(exported = false)
public interface SupplierRepository extends JpaRepository<Supplier, String> {

}