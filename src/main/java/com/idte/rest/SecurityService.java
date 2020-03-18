package com.idte.rest;

public interface SecurityService {
  String findLoggedInUsername();

  void autoLogin(String username, String password);
}