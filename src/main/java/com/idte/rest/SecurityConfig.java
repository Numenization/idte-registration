package com.idte.rest;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Autowired
    private DataSource dataSource;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth.jdbcAuthentication().dataSource(dataSource)
        .usersByUsernameQuery("SELECT username, password, enabled FROM admin WHERE username = ?")
        .authoritiesByUsernameQuery("SELECT a.username, r.name FROM role AS r INNER JOIN admins_roles AS j ON r.id = j.role_id INNER JOIN admin AS a ON a.id = j.admin_id WHERE a.username = ?");
    }

    /*
    SELECT r.name
    FROM role AS r
    INNER JOIN admins_roles as j
    ON r.id = j.role_id
    INNER JOIN admin as a
    ON a.id = j.admin_id
    WHERE a.name = "Test"
    */
 
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
      httpSecurity.authorizeRequests()
        .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
        .antMatchers("/**").permitAll()
        .and()
        .formLogin()
        .and()
        .logout()
        .logoutSuccessUrl("/")
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID");;

      httpSecurity.csrf()
        .ignoringAntMatchers("/**");
      httpSecurity.headers()
        .frameOptions()
        .sameOrigin();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
      return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
    };
}