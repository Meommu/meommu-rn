// miragejs
import { createServer, Response } from "miragejs";
import type { ServerConfig } from "miragejs/server";
import type { AnyModels, AnyFactories } from "miragejs/-types";

// constants
import { CODE } from "@/constants";

// utils
import { resBodyTemplate, regExp } from "@/utils";

// other
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";

export class MockApiService {
  register() {
    console.log("[miragejs] mock api 활성화");

    if (window.server) {
      window.server.shutdown();
    }

    const serverConfig: ServerConfig<AnyModels, AnyFactories> = {
      routes() {
        /**
         * [GET] 로그인 여부 확인
         */
        this.get("/api/v1/kindergartens/me", (schema, request) => {
          const {
            requestHeaders: { Authorization },
          } = request;

          if (Authorization.split(" ")[1] !== "<ACCESS_TOKEN>") {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.INVALID_HEADER_FORMAT,
                message: "인증 실패",
              })
            );
          }

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                id: 1,
                name: "",
                email: "",
                createdAt: new Date().toString(),
              },
            })
          );
        });

        /**
         * [GET] 이메일 중복검사
         */
        this.get("/api/v1/kindergartens/email", (schema, request) => {
          const {
            queryParams: { email },
          } = request;

          if (!email || !regExp.email.test(email)) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.BAD_REQUEST,
                message: "이메일이 올바르지 않습니다.",
              })
            );
          }

          const user = schema.db.users.findBy({ email });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: !user,
            })
          );
        });

        /**
         * [GET] 일기 조회
         */
        this.get("/api/v1/diaries", (schema, request) => {
          const {
            queryParams: { year, month },
            requestHeaders: { Authorization },
          } = request;

          if (Authorization.split(" ")[1] !== "<ACCESS_TOKEN>") {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.INVALID_HEADER_FORMAT,
                message: "인증 실패",
                data: null,
              })
            );
          }

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                diaries: [],
              },
            })
          );
        });

        /**
         * [GET] 사용자가 작성한 모든 일기의 작성 일자를 조회
         */
        this.get("/api/v1/diaries/summary", (schema, request) => {
          const {
            requestHeaders: { Authorization },
          } = request;

          if (Authorization.split(" ")[1] !== "<ACCESS_TOKEN>") {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.INVALID_HEADER_FORMAT,
                message: "인증 실패",
                data: null,
              })
            );
          }

          const diaries = schema.db.diaries;

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: diaries.map((diary) => {
                const { id, date, imageIds, createdAt } = diary;
                return {
                  id,
                  date,
                  createdAt,
                  imageIds,
                };
              }),
            })
          );
        });

        /**
         * [GET] 이미지 조회
         */
        this.get("/api/v1/images/:id", (schema, request) => {
          const {
            params: { id },
          } = request;

          const image = schema.db.images.findBy({ id });

          if (!image) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.IMAGE_NOT_FOUND,
                message: "id로 이미지를 찾을 수 없음",
              })
            );
          }

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: image,
            })
          );
        });

        /**
         * [POST] 이메일 패스워드로 로그인
         */
        this.post("/api/v1/kindergartens/signin", (schema, request) => {
          const { requestBody } = request;
          const { email, password } = JSON.parse(requestBody);

          const user = schema.db.users.findBy({ email });

          if (!user || user.password !== password) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.LOGIN_FAILED,
                message: "로그인이 실패하였습니다",
              })
            );
          }

          return new Response(
            httpStatus.CREATED,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "로그인 되었습니다",
              data: { accessToken: "<ACCESS_TOKEN>" },
            })
          );
        });

        /**
         * [POST] 회원가입
         */
        this.post("/api/v1/kindergartens/signup", (schema, request) => {
          const { requestBody } = request;

          const {
            name,
            ownerName,
            phone,
            email,
            password,
            passwordConfirmation,
          } = JSON.parse(requestBody);

          const user = schema.db.users.findBy({ email });

          if (!regExp.email.test(email)) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({ code: CODE.BAD_EMAIL })
            );
          }

          if (user) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({ code: CODE.EMAIL_DUP })
            );
          }

          schema.db.users.insert({ email, password });

          return new Response(
            httpStatus.CREATED,
            {},
            resBodyTemplate({
              code: CODE.OK,
              data: {
                data: {
                  id: 1,
                  name,
                  email,
                  createdAt: "2023-10-24T23:41:59.932223",
                },
              },
            })
          );
        });
      },
    };

    const server = createServer(serverConfig);

    server.db.loadData({
      users: [
        {
          email: "meommu@exam.com",
          password: "Password1!",
        },
      ],
      /**
       * TODO: users와의 관계 정의
       */
      images: Array(7)
        .fill(null)
        .map((_, i) => {
          return {
            id: i + 1,
            url: faker.image.url(),
          };
        }),
      diaries: [
        {
          id: 3,
          date: "2023-09-04",
          dogName: "사랑이",
          createdAt: "2023-09-04T17:42:18.744742",
          imageIds: [6, 7],
          title: "일기 3 제목",
          content: "일기 3 내용",
        },
        {
          id: 2,
          date: "2023-10-26",
          dogName: "똘이",
          createdAt: "2023-10-26T17:42:18.744742",
          imageIds: [1, 2, 3, 4, 5],
          title: "일기 2 제목",
          content: "일기 2 내용",
        },
        {
          id: 1,
          date: "2022-05-25",
          dogName: "코코",
          createdAt: "2023-05-25T17:42:18.744735",
          imageIds: [1, 2, 3, 4, 5],
          title: "일기 1 제목",
          content: "일기 1 내용",
        },
        {
          id: 4,
          date: "2023-10-25",
          dogName: "코코",
          createdAt: "2023-10-25T17:42:18.744735",
          imageIds: [4, 5],
          title: "일기 4 제목",
          content: "일기 4 내용",
        },
      ],
    });

    window.server = server;
  }
}
