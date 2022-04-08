import {UseInterceptors, Controller, Get, Post,UploadedFile } from '@nestjs/common';
import {FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';


import OSS = require("ali-oss");
import moment = require('moment');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post("/up-file")
  @UseInterceptors(FileInterceptor('file-name'))
 async uploadFile(@UploadedFile() file):Promise<string>{
    const OSS_CONFIG= {
        accessKeyId: "LTAI4FnG8FS1fyCci1SrZBiT",
        accessKeySecret: "iuMwXQgcFwvnxRP4kEzaTGpD7rBTwe",
        bucket: "dengzengfu",
        region: "oss-cn-beijing",
        endPoint: 'oss-cn-beijing.aliyuncs.com',
        BucketName: 'dengzengfu.oss-cn-beijing.aliyuncs.com'
      }
      const client =  new OSS(OSS_CONFIG);

      console.log(file);
      
    const uploadRes =  await client.put(moment().format('/YYYY/M/D/H/m/s/SSS')+'.jpg',file.buffer);
    console.log("文件上传成功===>"+uploadRes.url)
   return uploadRes.url;
  }
}
