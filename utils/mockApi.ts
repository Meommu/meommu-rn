import { createServer } from "miragejs";
import { Response } from "miragejs";

const responseTemplate = (data: unknown) => ({
  code: "",
  mesasge: "",
  data,
});

export class MockApiService {
  register() {
    console.log("[miragejs] mock api 활성화");

    if (window.server) {
      window.server.shutdown();
    }

    window.server = createServer({
      routes() {
        this.get("/api/v1/kindergartens/email", (schema, request) => {
          const {
            queryParams: { email },
          } = request;

          if (!email) {
            return responseTemplate(false);
          }

          if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return responseTemplate(false);
          }

          /**
           * 중복된 이메일 검사
           */
          if (email === "dup1@test.com") {
            return responseTemplate(false);
          }

          return responseTemplate(true);
        });

        this.post("/api/v1/kindergartens/signin", (schema, request) => {
          const { requestBody } = request;

          const { email, password } = JSON.parse(requestBody);

          if (email === "meommu@exam.com" && password === "Password1!") {
            return new Response(
              201,
              {},
              responseTemplate({
                code: "0000",
                message: "로그인 되었습니다",
                data: { accessToken: "<ACCESS_TOKEN>" },
              })
            );
          }

          return new Response(
            400,
            {},
            responseTemplate({
              code: "XXXX",
              message: "로그인이 실패하였습니다",
              data: null,
            })
          );
        });

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

          /**
           * 프론트엔드에서 중복검사가 되지 않았을 경우
           */
          if (email === "dup2@test.com") {
            return new Response(400, {}, responseTemplate(""));
          }

          return new Response(201, {}, responseTemplate(true));
        });
      },
    });
  }
}
