import * as Yup from 'yup';
import { countWords } from '../../common';

export const MAXIMUM_WORDS_HEADER = 15;
export const MAXIMUM_WORDS_COMPLAINT = 200;

export class InputTicketDetailsData {
  constructor(readonly header: string, readonly complaint: string) {
    this.header = header;
    this.complaint = complaint;
  }

  static empty(): InputTicketDetailsData {
    return new InputTicketDetailsData('', '');
  }
}

export const InputTicketDetailschema = Yup.object().shape({
  header: Yup.string().trim()
    .required('Please input your header')
    .test(`Must not exceed ${MAXIMUM_WORDS_HEADER} words`, val => countWords(val) <= MAXIMUM_WORDS_HEADER),
  complaint: Yup.string().trim()
    .required('Please input your complaint')
    .test(`Must not exceed ${MAXIMUM_WORDS_COMPLAINT} words`, val => countWords(val) <= MAXIMUM_WORDS_COMPLAINT),
});
