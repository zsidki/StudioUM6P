package com.example.demo.service;

import com.example.demo.entities.UserServiceSelection;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class PdfService {

    private final TemplateEngine templateEngine;

    public PdfService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public byte[] generatePdfForUser(List<UserServiceSelection> selections) {
        try {
            // Calculate totalHT (total before tax)
            double totalHT = calculateTotalHT(selections);

            // Since there are no taxes, we assume it's zero
            double taxes = 0;

            // Total = totalHT + taxes
            double total = totalHT + taxes;

            // Create Thymeleaf context and pass the data
            Context context = new Context();
            context.setVariable("username", selections.get(0).getUser().getUsername());
            context.setVariable("department", selections.get(0).getUser().getDepartment());
            context.setVariable("requestDate", selections.get(0).getRequestDate());
            context.setVariable("category", selections.get(0).getCategory());
            context.setVariable("services", selections);
            context.setVariable("totalHT", totalHT);
            context.setVariable("taxes", taxes);
            context.setVariable("total", total);

            // Render the HTML template with the data
            String renderedHtml = templateEngine.process("devisTemplate", context);

            // Convert the HTML to PDF using OpenHTML to PDF
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(renderedHtml, null);
            builder.toStream(byteArrayOutputStream);
            builder.run();

            return byteArrayOutputStream.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Method to calculate total HT (before tax)
    private double calculateTotalHT(List<UserServiceSelection> selections) {
        return selections.stream().mapToDouble(UserServiceSelection::getPrice).sum();
    }
}
