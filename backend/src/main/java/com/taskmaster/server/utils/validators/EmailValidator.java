package com.taskmaster.server.utils.validators;

import com.taskmaster.server.utils.validators.impl.EmailValidatorImpl;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EmailValidatorImpl.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailValidator {
    String message() default "Invalid email";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
