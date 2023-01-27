import xlsx from 'node-xlsx';
import { Subject } from './data';
import * as fs from 'fs';
type FirstRow = [`${'F'}${'A'}${'G'}`, ...Array<string>];
type Rows = [string, ...Array<number>];
interface Sheet {
  name: string;
  data: [FirstRow, ...Array<Rows>];
}
export function xlsxToSurveys(xlsxFile: string): Subject[] {
  const workbook = xlsx.parse(fs.readFileSync(xlsxFile));
  const subjects: Subject[] = [];
  let workbook1 = workbook[0] as Sheet;
  let questions = workbook1.data[0].slice(1);
  let rows = workbook1.data.slice(1);
  rows.forEach((row) => {
    let name = row[0];
    let response = row.slice(1);
    let subject = subjects.find((subject) => subject.name === name);
    if (!subject) {
      subject = { name, responses: [], questions };
      subjects.push(subject);
    }
    subject.responses.push(response as number[]);
  });
  return subjects;
}
