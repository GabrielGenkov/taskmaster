package com.taskmaster.server.utils;

import java.security.SecureRandom;

public class TokenGenerator {

	private static final int TOKEN_LENGTH = 32;
	private static final SecureRandom secureRandom = new SecureRandom();

	public static String generateToken() {
		byte[] tokenBytes = new byte[TOKEN_LENGTH];
		secureRandom.nextBytes(tokenBytes);
		return bytesToHex(tokenBytes);
	}

	private static String bytesToHex(byte[] bytes) {
		StringBuilder hexString = new StringBuilder();
		for (byte b : bytes) {
			String hex = Integer.toHexString(0xff & b);
			if (hex.length() == 1) {
				hexString.append('0');
			}
			hexString.append(hex);
		}
		return hexString.toString();
	}
}