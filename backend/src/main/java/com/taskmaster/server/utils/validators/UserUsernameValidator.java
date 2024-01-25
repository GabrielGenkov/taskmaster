package com.taskmaster.server.utils.validators;

import com.taskmaster.server.utils.validators.impl.UserUsernameValidatorImpl;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UserUsernameValidatorImpl.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UserUsernameValidator {
    String message() default "Invalid username";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

