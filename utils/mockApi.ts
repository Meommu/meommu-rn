// miragejs
import { createServer } from "miragejs";
import { Response } from "miragejs";

// constants
import { CODE } from "@/constants";

// utils
import { resBodyTemplate } from "./template";

// other
import httpStatus from "http-status";

export class MockApiService {
  register() {
    console.log("[miragejs] mock api 활성화");

    if (window.server) {
      window.server.shutdown();
    }

    window.server = createServer({
      routes() {
        /**
         * [GET] 이메일 중복검사
         */
        this.get("/api/v1/kindergartens/email", (schema, request) => {
          const {
            queryParams: { email },
          } = request;

          if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.BAD_REQUEST,
                message: "이메일이 올바르지 않습니다.",
              })
            );
          }

          if (email === "dup1@test.com") {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.EMAIL_DUP,
                message: "이메일이 중복되었습니다.",
              })
            );
          }

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상" })
          );
        });

        /**
         * [POST] 이메일 패스워드로 로그인
         */
        this.post("/api/v1/kindergartens/signin", (schema, request) => {
          const { requestBody } = request;

          const { email, password } = JSON.parse(requestBody);

          if (email === "meommu@exam.com" && password === "Password1!") {
            return new Response(
              httpStatus.CREATED,
              {},
              resBodyTemplate({
                code: CODE.OK,
                message: "로그인 되었습니다",
                data: { accessToken: "<ACCESS_TOKEN>" },
              })
            );
          }

          return new Response(
            httpStatus.BAD_REQUEST,
            {},
            resBodyTemplate({
              code: CODE.BAD_REQUEST,
              message: "로그인이 실패하였습니다",
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

          if (email === "dup2@test.com") {
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
                  name: "멈무유치원",
                  email: "meommu@exam.com",
                  createdAt: "2023-10-24T23:41:59.932223",
                },
              },
            })
          );
        });
      },
    });
  }
}
