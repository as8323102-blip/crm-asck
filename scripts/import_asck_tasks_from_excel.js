const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Encontrar el archivo más reciente en Downloads
const downloadsDir = path.join(process.env.USERPROFILE, 'Downloads');
const files = fs.readdirSync(downloadsDir)
  .filter(f => f.startsWith('ASCK_Delegacion_Pendientes_AUTO') && f.endsWith('.xlsx'))
  .map(f => {
    const filePath = path.join(downloadsDir, f);
    const stats = fs.statSync(filePath);
    return { name: f, path: filePath, mtime: stats.mtime };
  })
  .sort((a, b) => b.mtime - a.mtime);

if (files.length === 0) {
  console.error("No se encontró el archivo ASCK_Delegacion_Pendientes_AUTO.xlsx en Descargas.");
  process.exit(1);
}

const targetFile = files[0];
console.log("Leyendo archivo:", targetFile.path, "Modificado el:", targetFile.mtime);

const workbook = XLSX.readFile(targetFile.path);
console.log("Hojas disponibles:", workbook.SheetNames);

const sheetName = 'Tareas ASCK';
if (!workbook.SheetNames.includes(sheetName)) {
  console.error(`La hoja '${sheetName}' no existe en el archivo.`);
  process.exit(1);
}

const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
console.log("Total de filas leídas (incluyendo cabeceras/vacías):", rows.length);

if (rows.length > 0) {
  let headerRowIdx = 0;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] && rows[i].filter(c => c !== null && c !== '').length >= 3) {
      headerRowIdx = i;
      break;
    }
  }
  console.log("Cabeceras detectadas en la fila:", headerRowIdx);
  console.log("Cabeceras:", rows[headerRowIdx]);
  console.log("Primeras 3 filas de datos:");
  console.log(rows.slice(headerRowIdx + 1, headerRowIdx + 4));
}
