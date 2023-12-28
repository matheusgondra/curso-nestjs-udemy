import "dotenv/config";
import { Test, TestingModule } from "@nestjs/testing";
import { CoursesController } from "./courses.controller";
import { INestApplication } from "@nestjs/common";
import { Course } from "./entities/courses.entity";

describe("CoursesController E2E tests", () => {
	let app: INestApplication;
	let module: TestingModule;
	let data: any;
	let courses: Course[];
	const dataSourceOptions = {
		type: "postgres",
		host: process.env.DB_HOST_TEST,
		port: Number(process.env.DB_PORT_TEST),
		username: process.env.DB_USER_TEST,
		password: process.env.DB_PASSWORD_TEST,
		database: process.env.DB_NAME_TEST,
		entities: [__dirname + "/../**/*.entity{.ts,.js}"],
		synchronize: false,
		migrations: [__dirname + "/../migrations/*{.ts,.js}"]
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CoursesController]
		}).compile();

		controller = module.get<CoursesController>(CoursesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
