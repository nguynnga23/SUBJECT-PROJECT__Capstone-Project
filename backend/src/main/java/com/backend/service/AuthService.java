package com.backend.service;

import com.backend.dto.request.ChangePasswordReq;
import com.backend.dto.request.LoginReq;
import com.backend.dto.request.RegisterReq;
import com.backend.dto.request.UpdateProfileReq;

import java.util.Map;

public interface AuthService {

    Map<String, Object> login(LoginReq req);

    Map<String, Object> register(RegisterReq req);

    Map<String, Object> me(String token);

    Map<String, Object> updateMe(String token, UpdateProfileReq req);

    Map<String, Object> changePassword(String token, ChangePasswordReq req);
}
