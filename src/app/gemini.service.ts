import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from './environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;

  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    const apiKey = environment.googleGenerativeAIKey;

    this.generativeAI = new GoogleGenerativeAI(apiKey);
  }

  async generateText(prompt: string) {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });

    this.messageHistory.next({
      from: 'user',
      message: prompt,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    this.messageHistory.next({
      from: 'bot',
      message: text,
    });
  }

  public getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }
}
