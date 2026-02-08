const puppeteer = require('puppeteer');
const path = require('path');

class PDFService {
  static async generateCertificate(certificate) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .certificate { border: 10px solid #007bff; padding: 40px; width: 800px; margin: 0 auto; }
            h1 { color: #007bff; font-size: 48px; margin-bottom: 20px; }
            h2 { color: #333; font-size: 24px; margin-bottom: 30px; }
            p { font-size: 18px; line-height: 1.6; }
            .signature { margin-top: 40px; text-align: right; }
            .date { margin-top: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>CERTIFICATE OF COMPLETION</h1>
            <h2>This is to certify that</h2>
            <h2 style="color: #007bff; font-size: 36px;">${certificate.user.name}</h2>
            <p>has successfully completed the course</p>
            <h2>${certificate.course.title}</h2>
            <p>with a score of ${certificate.score}%</p>
            <div class="date">Issued on: ${certificate.issuedAt.toLocaleDateString()}</div>
            <div class="date">Certificate ID: ${certificate.certificateNumber}</div>
            <div class="signature">
              <p>_________________________</p>
              <p>Course Instructor</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await page.setContent(html);
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      });

      await browser.close();
      return pdfBuffer;
    } catch (error) {
      throw new Error(`Failed to generate PDF: ${error.message}`);
    }
  }

  static async generateTranscript(transcript) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
            .stat-card { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px; }
            .stat-number { font-size: 24px; font-weight: bold; color: #007bff; }
            .stat-label { color: #666; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Academic Transcript</h1>
            <p>Generated on: ${transcript.generatedAt.toLocaleDateString()}</p>
          </div>
          
          <div class="stats">
            <div class="stat-card">
              <div class="stat-number">${transcript.totalQuizzes}</div>
              <div class="stat-label">Total Quizzes</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${transcript.passedQuizzes}</div>
              <div class="stat-label">Passed Quizzes</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${transcript.averageScore}%</div>
              <div class="stat-label">Average Score</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${transcript.certificates}</div>
              <div class="stat-label">Certificates Earned</div>
            </div>
          </div>

          <h2>Course Statistics</h2>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Best Score</th>
                <th>Status</th>
                <th>Attempts</th>
              </tr>
            </thead>
            <tbody>
              ${transcript.courseStats.map(stat => `
                <tr>
                  <td>${stat.course.title}</td>
                  <td>${stat.bestScore}%</td>
                  <td>${stat.passed ? 'Passed' : 'Failed'}</td>
                  <td>${stat.attempts.length}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      await page.setContent(html);
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      });

      await browser.close();
      return pdfBuffer;
    } catch (error) {
      throw new Error(`Failed to generate transcript PDF: ${error.message}`);
    }
  }
}

module.exports = PDFService;