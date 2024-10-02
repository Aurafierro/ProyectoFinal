package com.sena.jwt_security.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.Resource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    // Ubicación en Windows
    private final String uploadDir = "C:/imagenes";

    public String storeFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        // Obtener el nombre del archivo original
        String originalFileName = file.getOriginalFilename();

        // Manejo de nombres de archivos duplicados
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;

        // Construir la ruta completa del archivo
        Path filePath = uploadPath.resolve(fileName).normalize();

        // Verificar si es una imagen
        String contentType = file.getContentType();
        if (!contentType.startsWith("image/")) {
            throw new IllegalArgumentException("El archivo debe ser una imagen.");
        }

        // Guardar el archivo en el servidor
        Files.copy(file.getInputStream(), filePath);

        // Retornar el nombre del archivo guardado
        return fileName;
    }

	public Resource loadFileAsResource(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}
}
