export enum PublicationTypes {
  NEWSPAPER_ARTICLE = 'Newspaper Article',
  BOOK = 'Book',
  BOOK_CHAPTER = 'Book chapter',
  POST = 'Post'
}

export interface Publication {
  id: string;
  title: string;
  type: PublicationTypes;
  appearanceDate: Date;
  link: string;
  pdfSource: string;
  author_id: string;
  contributers_ids: string[];
}

