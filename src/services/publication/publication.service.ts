import { Injectable } from '@angular/core';
import { getGlobal, setGlobal } from 'src/app/app-config';
import { Publication } from 'src/models/publication.model';
import { AuthService } from '../AuthService';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private authService: AuthService) { }

  private getArticles(): Publication[] {
    return getGlobal()['articles']
      .map((article: Publication) => ({
        ...article,
        appearanceDate: new Date(article.appearanceDate),
        author_id: this.authService.currentUserState.id
      }));
  }

  private setArticles(articles: Publication[]): void {
    setGlobal({
      ...getGlobal(),
      articles: articles.map(article => ({
        ...article,
        appearanceDate: article.appearanceDate.getTime()
      }))
    });
  }

  getById(id: string): Promise<Publication | null> {
    return Promise.resolve(this.getArticles().find(item => item.id === id) || null);
  }

  getAll(): Promise<Publication[]> {
    return Promise.resolve(this.getArticles());
  }

  addArticle(article: Publication): Promise<Publication> {
    article = this.prepareArticleToSave(article);
    this.saveArticle(article);
    return Promise.resolve(article);
  }

  edit(id: string, article: Publication): Promise<Publication | null> {
    const articles = this.getArticles();
    const articleIndex = articles.findIndex(item => item.id === id);

    if (articleIndex === -1) {
      return Promise.resolve(null);
    }
    articles[articleIndex] = this.prepareArticleToEdit(articles[articleIndex], article);
    this.setArticles(articles);

    return Promise.resolve(articles[articleIndex]);
  }

  delete(id: string): Promise<void> {
    const articles = this.getArticles();
    this.setArticles(articles.filter(item => item.id !== id));
    return Promise.resolve();
  }

  private prepareArticleToSave(article: Publication): Publication {
    const creationDate = new Date();
    return {
      ...article,
      id: creationDate.getTime().toString(),
      appearanceDate: creationDate,
      author_id: this.authService.currentUserState.id
    };
  }

  private prepareArticleToEdit(articleOldData: Publication, articleNewData: Publication): Publication {
    return {
      ...articleNewData,
      id: articleOldData.id,
      appearanceDate: articleOldData.appearanceDate,
      author_id: articleOldData.id
    };
  }

  private saveArticle(article: Publication) {
    const articles = this.getArticles();
    articles.push(article);
    this.setArticles(articles);
  }
}
