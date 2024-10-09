package com.sena.jwt_security.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    //ubicación en windows
    private final String uploadDir = "C:/imagenes";
   

    public String storeFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

              String fileName = file.getOriginalFilename();

    
        Path filePath = uploadPath.resolve(fileName).normalize();


        Files.copy(file.getInputStream(), filePath);

        return fileName;
    }
}