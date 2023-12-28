import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CoursesModule } from "./courses/courses.module";
import { AppService } from "./app.service";
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		CoursesModule,
		DatabaseModule,
		ConfigModule.forRoot({ isGlobal: true })
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
