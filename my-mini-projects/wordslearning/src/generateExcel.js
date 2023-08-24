import * as XLSX from 'xlsx';

export function generateExcel(resultArray) {
    // Создаем данные для таблицы (пример)
    let data;
    
    data = resultArray.map(el => [el]);
    
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Study words");

    // Сохраняем созданный файл в формате Excel
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });
    saveAsExcelFile(excelBuffer, "example.xlsx");
}

function saveAsExcelFile(buffer, fileName) {
    const data = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    if (navigator.msSaveBlob) {
        // Для Internet Explorer
        navigator.msSaveBlob(data, fileName);
    } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(data);
        link.download = fileName;
        link.click();
    }
}