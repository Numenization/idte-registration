package com.idte.rest;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Autowired
    private DataSource dataSource;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth.jdbcAuthentication().dataSource(dataSource)
        .usersByUsernameQuery("select username, pass from admin where username=?")
        .authoritiesByUsernameQuery("select username, role from admin_roles where username=?");
    }
 
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

      httpSecurity.authorizeRequests()
        .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
        .antMatchers("/**").permitAll()
        .and()
        .formLogin();

      httpSecurity.csrf()
        .ignoringAntMatchers("/**");
      httpSecurity.headers()
        .frameOptions()
        .sameOrigin();
    }
}