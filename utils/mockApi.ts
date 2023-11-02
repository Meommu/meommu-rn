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

export class MockApiService {
  register() {
    console.log("[miragejs] mock api 활성화");

    if (window.server) {
      window.server.shutdown();
    }

    const serverConfig: ServerConfig<AnyModels, AnyFactories> = {
      routes() {
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
          /**
           * TODO: 헤더로부터 토큰을 추출해 사용자 식별
           */

          const {
            queryParams: { year, month },
          } = request;

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
         * [POST] 이메일 패스워드로 로그인
         */
        this.post("/api/v1/kindergartens/signin", (schema, request) => {
          const { requestBody } = request;
          const { email, password } = JSON.parse(requestBody);

          const user = schema.db.users.findBy({ email });

          if (user.password !== password) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.LOGIN_FAILD,
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
      diary: [],
    });

    window.server = server;
  }
}
