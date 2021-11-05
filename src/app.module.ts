import { Module } from '@nestjs/common';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';
import { GithubModule } from './github/github.module';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [GithubModule, HttpModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class AppModule {}
