package com.taskmaster.server.config;

import java.util.List;

public final class AppConstants {
    private AppConstants(){}
    public static final int MAXIMUM_USERNAME_LENGTH = 20;
    public static final int MINIMUM_USERNAME_LENGTH = 4;

    public static final String API_BASE = "/api";
    public static final List<String> DO_NOT_FILTER_PATHS = List.of(
            AppConstants.API_BASE + "/v1/auth/sign-in",
            AppConstants.API_BASE + "/v1/auth/sign-up"
    );
    public static final List<String> CROSS_ORIGIN_DOMAINS = List.of(
            "http://localhost:3001",
            "http://localhost:3000",
            "http://127.0.0.1:80"
    );
}
