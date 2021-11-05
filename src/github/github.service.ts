import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class GithubService {

  constructor(private httpService: HttpService) {}

  async getCommitsService(branch: string, messages: string | null, hashes: string | null): Promise<any[] | {}>{
    if(branch){
      //If the branch name is given in query parameter
      let resp = await this.httpService.get(`https://api.github.com/repos/nodejs/node/commits?per_page=25&sha=${branch}`).toPromise()
      let data = resp.data;
      let filterResp = []
      if(hashes === 'true' && messages === 'true'){
        for(let i = 0; i < data.length; i++){
          filterResp.push({
            hash: data[i].sha,
            message: data[i].commit.message
          })
        }
        return filterResp
      }
      if(messages === 'true'){
        for(let i = 0; i < data.length; i++){
          filterResp.push({
            message: data[i].commit.message
          })
        }
        return filterResp
      }
      if(hashes  === 'true'){
        for(let i = 0; i < data.length; i++){
          filterResp.push({
            hash: data[i].sha
          })
        }
        return filterResp
      }
      
      return data
    }

    //If the branch name is NOT given in query parameter fetch all commits
    return {
      error: 'Please provide some branch name to the url query exmpl: ?branch=master',
      info: 'To filter commits by messages or hashes please add to query ?messages=true or ?hashes=true'
    }

  }

}
