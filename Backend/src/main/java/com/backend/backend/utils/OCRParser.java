package com.backend.backend.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class OCRParser {
    public static String extractParsedText(String ocrOutput) {
        Pattern pattern = Pattern.compile("\"ParsedText\":\"(.*?)\",\"ErrorMessage\":", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(ocrOutput);
        if (matcher.find()) {
            // Replace escaped newlines with actual newlines
            return matcher.group(1).replace("\\n", "\n");
        } else {
            return "";
        }
    }

    public static void main(String[] args) {
        String ocrOutput = "..."; // your OCR text blob
        String parsedText = extractParsedText(ocrOutput);
        System.out.println(parsedText);
    }
}