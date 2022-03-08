import { Controller, Get, Post } from '@nestjs/common';
import { IntentsService } from '../providers/intents.service';

@Controller('detectIntents')
export class IntentsController {
  constructor(private readonly intentService: IntentsService) {}

  @Get()
  getOla() {
    const id = this.intentService.getUuid();
    const projectId = this.intentService.getProjectId();

    return {
      id: id,
      porject: projectId,
    };
  }

  @Post()
  postOla() {
    const sessionId = this.intentService.getUuid();
    const projectId = this.intentService.getProjectId();
    const sessiontPath = this.intentService.getSessionPath(
      sessionId,
      projectId,
    );

    console.log('sessionId: ', sessionId);
    console.log('projectId: ', projectId);
    console.log('sessiontPath: ', sessiontPath);

    return sessiontPath;
  }
}
