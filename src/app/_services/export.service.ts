import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  getValueFromRule(item, rule) {
    let value: any;
    if (typeof rule === 'string') { // Field name
      value = item[rule];
    } else if (typeof rule === 'function') { // Function that returns proper value from the item
      value = rule(item);
    }
    return value || value === 0 ? value : '';
  }

  convertToCSV(headers: any, array: any[]) {
    let str = '';

    for (const h in headers) {
      if (headers[h].hasOwnProperty(h)) {
        continue;
      }
      if (str !== '') {
        str += ',';
      }
      str += h;
    }
    str += '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const h in headers) {
          if (!headers.hasOwnProperty(h)) {
            continue;
          }
          if (line !== '') {
            line += ',';
          }

          line += this.csvSafe(this.getValueFromRule(array[i], headers[h]));
        }

        str += line + '\r\n';
    }

    return str;
  }

  // headers format: {header1: 'field1', header2: 'field2', ...}
  exportCSVFile(headers: any, items: any[], fileTitle: string) {
    const csv = this.convertToCSV(headers, items);
    const exportedFilename = (fileTitle || 'export') + '.csv';
    this.download(exportedFilename, csv, 'text/csv;charset=utf-8;');
  }

  prepareForXlsx(headers: any, items: any[]): any[] {
    const result = [];
    items.forEach((item) => {
      const newItem = {};
      for (const h in headers) {
        if (headers[h].hasOwnProperty(h)) {
          continue;
        }
        newItem[h] = this.getValueFromRule(item, headers[h]);
      }
      result.push(newItem);
    });
    return result;
  }

  // headers format: {header1: 'field1', header2: 'field2', ...}
  exportXlsxFile(headers: any, items: any[], fileTitle: string, sheetName?: string) {

    const exportHeader: string[] = [];
    for (const h in headers) {
      if (headers[h].hasOwnProperty(h)) {
        continue;
      }
      exportHeader.push(h);
    }

    /* make the worksheet */
    const ws = XLSX.utils.json_to_sheet(this.prepareForXlsx(headers, items), { header: exportHeader });

    /* add to workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    /* write workbook (use type 'binary') */
    const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        // tslint:disable-next-line:no-bitwise
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    };

    const exportedFilename = (fileTitle || 'export') + '.xlsx';
    this.download(exportedFilename, s2ab(wbout), 'application/octet-stream');
  }

  csvSafe(item): string {
    if (!item && item !== 0) {
      return '';
    }
    if (typeof item === 'string') {
      return '"' + item.replace(/\"/g, '""') + '"';
    }
    return item.toString();
  }

  printHtml(title: string, headers: any, items: any[]): string {
    let s = '';
    s += '<head>\r\n';
    s += '<title>';
    s += title || '';
    s += '</title>\r\n';
    s += '<style>\r\n';
    s += 'table {\r\n';
    s += 'border-collapse: collapse;\r\n';
    s += '}\r\n';
    s += 'table, th, td {\r\n';
    s += 'border: 1px solid lightgray;\r\n';
    s += '}\r\n';
    s += '</style>\r\n';
    s += '</head>\r\n';
    s += '<body>\r\n';
    s += `<h1>${title || ''}</h1>\r\n`;
    s += '<table>\r\n';
    s += '<thead>\r\n';
    for (const h in headers) {
      if (!headers.hasOwnProperty(h)) {
        continue;
      }
      s += '<th>';
      s += h;
      s += '</th>';
    }
    s += '</thead>\r\n';
    s += '<tbody>\r\n';
    for (let i = 0; i < items.length; i++) {
      s += '<tr>';
      for (const h in headers) {
        if (!headers.hasOwnProperty(h)) {
          continue;
        }
        s += '<td>';
        s += this.getValueFromRule(items[i], headers[h]);
        s += '</td>';
      }
      s += '</tr>\r\n';
    }
    s += '</tbody>\r\n';
    s += '</table>\r\n';
    s += '</body>\r\n';
    return s;
  }

  // headers format: {header1: 'field1', header2: 'field2', ...}
  print(title: string, headers: any, items: any[]) {
    const win = window.open();
    if (!win) {
      window.alert('Please disable popup blocker for this site.');
      return;
    }
    win.document.open();
    win.document.writeln(this.printHtml(title, headers, items));
    win.document.close();
    win.print();
  }

  download(fileName: string, content, type?: string) {
    const blob = new Blob([content], { type: type });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            link.onclick = (e) => {
              e.cancelBubble = true;
              e.stopPropagation();
            };
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }
}
