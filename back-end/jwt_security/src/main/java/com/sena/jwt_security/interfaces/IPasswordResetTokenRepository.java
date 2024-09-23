package com.sena.jwt_security.interfaces;


import org.springframework.data.repository.CrudRepository;

import com.sena.jwt_security.models.PasswordResetToken;

public interface IPasswordResetTokenRepository extends CrudRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
}
