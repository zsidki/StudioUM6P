package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OTPService {

    // Store OTPs in memory (for demo purposes)
    private Map<String, String> otpStore = new HashMap<>();

    // Generate and store OTP
    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.put(email, otp);  // Store the OTP against the email
        return otp;
    }

    // Validate OTP
    public boolean validateOtp(String email, String otp) {
        String storedOtp = otpStore.get(email);
        return storedOtp != null && storedOtp.equals(otp);
    }

    // Optional: You can clear the OTP after it's validated to prevent reuse
    public void clearOtp(String email) {
        otpStore.remove(email);
    }
}
