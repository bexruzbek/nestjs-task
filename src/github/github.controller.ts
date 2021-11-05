import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {

  constructor(private readonly githubService: GithubService) {}

  @Get()
  async getCommits(
    @Query('branch') branch: string,
    @Query('messages') messages: string | null,
    @Query('hashes') hashes: string | null
  ){
    return await this.githubService.getCommitsService(branch, messages, hashes)
  }

}
