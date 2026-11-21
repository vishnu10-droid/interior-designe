const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'public/documents/Ananya Company Profile (May\'25) 2_compressed.pdf';

const dataBuffer = fs.readFileSync(pdfPath);

async function extract() {
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  console.log('=== NUMBER OF PAGES ===', result.total);
  console.log('=== FULL TEXT EXTRACTED ===');
  console.log(result.text);
  console.log('=== END OF TEXT ===');
  await parser.destroy();
}

extract().catch(err => {
  console.error('Error:', err.message);
});
