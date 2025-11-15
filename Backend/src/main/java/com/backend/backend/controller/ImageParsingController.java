package com.backend.backend.controller;

import com.backend.backend.utils.MultipartInputStreamFileResource;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import io.github.cdimascio.dotenv.Dotenv;

@RestController
@RequestMapping("/imagetext")
public class ImageParsingController {

    Dotenv dotenv = Dotenv.load();
    private final String ocrApiKey = dotenv.get("OCR_API_KEY");
    private final String ocrEndpoint = "https://api.ocr.space/parse/image";
    private final RestTemplate restTemplate;

    public ImageParsingController() {
        this.restTemplate = new RestTemplate();
    }

    // POST http://localhost:8080/imagetext/parse
    @PostMapping("/parse")
    public String getText(@RequestParam("file") MultipartFile file) throws TesseractException, IOException {
        System.out.println("Scanning for nutrition facts!");

        // Prepare the mutli-part request
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
        body.add("language", "eng");
        body.add("isOverlayRequired", "false");
        body.add("OCREngine", "2");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.add("apikey", ocrApiKey);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Send the POST request
        ResponseEntity<String> response = restTemplate.postForEntity(ocrEndpoint, requestEntity, String.class);

        return response.getBody();
    }
}