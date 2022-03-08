import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import dialogflow from '@google-cloud/dialogflow';
import * as credentials from '../config/credentials.json';
import { CredentialProvider } from '../config/credentials.providers';

@Injectable()
export class IntentsService {
  private readonly sessionClient;

  constructor(private readonly credentials: CredentialProvider) {
    this.sessionClient = new dialogflow.SessionsClient({
      credentials: credentials,
    });
  }

  getUuid(): string {
    const sessionId = uuid.v4();
    return sessionId;
  }

  getProjectId(): string {
    const projectId = process.env.PROJECT_ID;
    return projectId;
  }

  async getSessionPath(sessionId: string, projectId: string) {
    try {
      console.log('Credenciais: ', credentials);
      console.log('Chave: ', credentials.private_key);
      console.log('Email: ', credentials.client_email);
      const sessionPath = this.sessionClient.projectAgentSessionPath(
        projectId,
        sessionId,
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: 'Olá Marcos Gray',
            languageCode: 'pt-br',
          },
        },
      };
      const response = await this.sessionClient.detectIntent(request);
      console.log('Response: ', response);
      const result = response[0].queryResult;
      return result.intent.displayName;
    } catch (err) {
      throw new Error('Error: ' + err);
    }
  }
}
