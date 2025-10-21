import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateDevisPDF = (data) => {
  const doc = new jsPDF();

  // Header and other PDF content
  doc.setFontSize(12);
  doc.text("Devis com services", 10, 10);
  doc.text(`Client Name: ${data.clientName}`, 10, 20);
  doc.text(`Date: ${data.date}`, 10, 30);
  doc.text(`Department: ${data.department}`, 10, 40);

  // Project details
  data.projects.forEach((project, index) => {
    doc.text(`Project: ${project.name}`, 10, 50 + index * 10);
    doc.autoTable({
      head: [['Service Name', 'Price (MAD)', 'Total (MAD)']],
      body: project.services.map(service => [service.name, service.price, service.total]),
      startY: 60 + index * 30
    });
  });

  // Total
  doc.text(`Total HT: ${data.totalHT} MAD`, 10, 150);
  doc.text(`TVA: ${data.TVA}%`, 10, 160);
  doc.text(`Total: ${data.total} MAD`, 10, 170);

  // Save the PDF
  doc.save('devis.pdf');
};

export default generateDevisPDF;
