/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportService } from './export.service';

describe('Service: Download', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportService]
    });
  });

  it('should ...', inject([ExportService], (service: ExportService) => {
    expect(service).toBeTruthy();
  }));

  it('#getValueFromRule string rule reads a field off object', inject([ExportService], (service: ExportService) => {
    expect(service.getValueFromRule({field: 1}, 'field')).toEqual(1);
  }));

  it('#getValueFromRule function rule returns custom value', inject([ExportService], (service: ExportService) => {
    expect(service.getValueFromRule({field: 1}, (i) => i.field)).toEqual(1);
  }));

  it('#convertToCSV function converts an object into CSV', inject([ExportService], (service: ExportService) => {
    expect(service.convertToCSV({
      Field1: 'field1',
      Field2: 'field2'
    }, [{field1: 1, field2: '2'}, {field1: 3, field2: '4'}])).toEqual('Field1,Field2\r\n1,"2"\r\n3,"4"\r\n');
  }));

  it('#printHtml function generates proper HTML', inject([ExportService], (service: ExportService) => {
    expect(service.printHtml('title', {
      Field1: 'field1',
      Field2: 'field2'
    // tslint:disable-next-line:max-line-length
    }, [{field1: 1, field2: '2'}, {field1: 3, field2: '4'}])).toEqual('<head>\r\n<title>title</title>\r\n<style>\r\ntable {\r\nborder-collapse: collapse;\r\n}\r\ntable, th, td {\r\nborder: 1px solid lightgray;\r\n}\r\n</style>\r\n</head>\r\n<body>\r\n<h1>title</h1>\r\n<table>\r\n<thead>\r\n<th>Field1</th><th>Field2</th></thead>\r\n<tbody>\r\n<tr><td>1</td><td>2</td></tr>\r\n<tr><td>3</td><td>4</td></tr>\r\n</tbody>\r\n</table>\r\n</body>\r\n');
  }));

  it('#prepareForXlsx function trasnforms JSON properly', inject([ExportService], (service: ExportService) => {
    expect(service.prepareForXlsx({
      Field1: 'field1',
      Field2: () => 'str'
    }, [{field1: 1, field2: '2'}, {field1: 3, field2: '4'}])).toEqual([{Field1: 1, Field2: 'str'}, {Field1: 3, Field2: 'str'}]);
  }));
});
