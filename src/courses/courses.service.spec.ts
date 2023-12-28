import { randomUUID } from "crypto";
import { CoursesService } from "./courses.service";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";

describe("CoursesService unit tests", () => {
	let service: CoursesService;
	let id: string;
	let createdAt: Date;
	let expectOutputTags: any;
	let expectOutputCourses: any;
	let mockCourseRepository: any;
	let mockTagRepository: any;

	beforeEach(async () => {
		service = new CoursesService();
		id = randomUUID();
		createdAt = new Date();
		expectOutputTags = [{ id, name: "nestjs", createdAt }];
		expectOutputCourses = [{ id, name: "test", description: "test description", createdAt, tags: expectOutputTags }];
		mockCourseRepository = {
			create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
			save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
			update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
			preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
			findAll: jest.fn().mockResolvedValue(Promise.resolve(expectOutputCourses)),
			find: jest.fn().mockResolvedValue(Promise.resolve(expectOutputCourses)),
			findOne: jest.fn().mockResolvedValue(Promise.resolve(expectOutputCourses)),
			remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses))
		};

		mockTagRepository = {
			create: jest.fn().mockResolvedValue(Promise.resolve(expectOutputTags)),
			findOne: jest.fn()
		}
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("Should create a course", async () => {
		//@ts-ignore-error defined part of method
		service["courseRepository"] = mockCourseRepository;
		//@ts-ignore-error defined part of method
		service["tagRepository"] = mockTagRepository;

		const createCourseDTO: CreateCourseDTO = {
			name: "test",
			description: "test description",
			tags: ["nestjs"]
		};

		const newCourse = await service.create(createCourseDTO);

		expect(mockCourseRepository.create).toHaveBeenCalled();
		expect(mockCourseRepository.save).toHaveBeenCalled();
		expect(expectOutputCourses).toStrictEqual(newCourse);
	})

	it("Should find all courses", async () => {
		//@ts-ignore-error defined part of method
		service["courseRepository"] = mockCourseRepository;
		//@ts-ignore-error defined part of method
		service["tagRepository"] = mockTagRepository;

		const courses = await service.findAll();

		expect(mockCourseRepository.find).toHaveBeenCalled();
		expect(expectOutputCourses).toStrictEqual(courses);
	})

	it("Should gets a course by id", async () => {
		//@ts-ignore-error defined part of method
		service["courseRepository"] = mockCourseRepository;
		//@ts-ignore-error defined part of method
		service["tagRepository"] = mockTagRepository;

		const course = await service.findOne(id);

		expect(mockCourseRepository.findOne).toHaveBeenCalled();
		expect(expectOutputCourses).toStrictEqual(course);
	})

	it("Should update a course", async () => {
		//@ts-ignore-error defined part of method
		service["courseRepository"] = mockCourseRepository;
		//@ts-ignore-error defined part of method
		service["tagRepository"] = mockTagRepository;

		const updateCourseDTO: UpdateCourseDTO = {
			name: "test",
			description: "test description",
			tags: ["nestjs"]
		};
		
		const course = await service.update(id, updateCourseDTO);

		expect(mockCourseRepository.save).toHaveBeenCalled();
		expect(mockCourseRepository.preload).toHaveBeenCalled();
		expect(expectOutputCourses).toStrictEqual(course);
	})

	it("Should delete a course", async () => {
		//@ts-ignore-error defined part of method
		service["courseRepository"] = mockCourseRepository;
		//@ts-ignore-error defined part of method
		service["tagRepository"] = mockTagRepository;

		const course = await service.remove(id);

		expect(mockCourseRepository.findOne).toHaveBeenCalled();
		expect(mockCourseRepository.remove).toHaveBeenCalled();
		expect(expectOutputCourses).toStrictEqual(course);
	})
});