import "dotenv/config";
import { Test, TestingModule } from "@nestjs/testing";
import { CoursesController } from "./courses.controller";
import { INestApplication } from "@nestjs/common";
import { Course } from "./entities/courses.entity";
import { CoursesModule } from "./courses.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

describe("CoursesController E2E tests", () => {
	let app: INestApplication;
	let module: TestingModule;
	let data: any;
	let courses: Course[];
	const dataSourceTest: DataSourceOptions = {
		type: "postgres",
		host: process.env.DB_HOST_TEST,
		port: Number(process.env.DB_PORT_TEST),
		username: process.env.DB_USER_TEST,
		password: process.env.DB_PASSWORD_TEST,
		database: process.env.DB_NAME_TEST,
		entities: [__dirname + "/../**/*.entity{.ts,.js}"],
		synchronize: true
	}

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [
				CoursesModule,
				TypeOrmModule.forRootAsync({ useFactory: async () => dataSourceTest })
			]
		}).compile();
		app = module.createNestApplication();
		await app.init();

		data = {
			name: "Node.js",
			description: "Node.js",
			tags: ["nodejs, nestjs"]
		}
	});
	
	beforeEach(async () => {
		const dataSource = await new DataSource(dataSourceTest).initialize();
		const repository = dataSource.getRepository(Course);
		courses = await repository.find();
		await dataSource.destroy();
	});
});
