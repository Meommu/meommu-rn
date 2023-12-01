// miragejs
import { createServer, Response } from "miragejs";
import type { ServerConfig } from "miragejs/server";
import type { AnyModels, AnyFactories } from "miragejs/-types";

// constants
import { CODE, regExp } from "@/constants";

// utils
import { resBodyTemplate, createRandomNumberInRange } from "@/utils";

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
        this.delete("/api/v1/kindergartens", (schema, request) => {
          schema.db.users.remove({ id: 1 });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상" })
          );
        });

        this.delete("/api/v1/diaries/:id", (schema, request) => {
          const {
            params: { id },
          } = request;

          schema.db.diaries.remove({ id });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상" })
          );
        });

        this.get("/api/v1/notices", (schema, request) => {
          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                notices: [
                  {
                    id: 2,
                    title: "공지 2 제목",
                    content:
                      "안녕하세요, 네이버웍스입니다.\n네이버웍스 V3.8 정기 업데이트가\n2023년 11월 21일(화)에 진행됩니다.\n■ 업데이트 일정: 2023년 11월 21일(목) 오전 중 작업 시간 중에도 네이버웍스 서비스를 이용할 수 있으나 서비스 접속이 일시적으로 불안정할 수 있으며, 앱 노출 시간은 앱 스토어 사정에 따라 상이할 수 있습니다. ■ 배포 대상 ① NAVER WORKSWindows 버전/macOS 버전/Android/iOS 버전",
                    createdAt: "2023-11-30T14:45:32.43085",
                  },
                  {
                    id: 1,
                    title: "공지 1 제목",
                    content: "공지 1 내용",
                    createdAt: "2023-11-29T14:45:32.430834",
                  },
                ],
              },
            })
          );
        });

        this.patch("/api/v1/kindergartens/info", (schema, request) => {
          const {
            requestHeaders: { Authorization },
            requestBody,
          } = request;

          /**
           * TODO: body 내용이 올바르지 않을 경우 잘못된 요청 응답 반환 구현
           */
          const { name, ownerName, phone } = JSON.parse(requestBody);

          if (!Authorization) {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.NO_AUTHORIZATION_HEADER,
                message: "인증 헤더를 찾을 수 없음",
              })
            );
          }

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

          schema.db.users.update({ id: 1 }, { name, ownerName, phone });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상" })
          );
        });

        this.get("/api/v1/kindergartens/info", (schema, request) => {
          const {
            requestHeaders: { Authorization },
          } = request;

          if (!Authorization) {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.NO_AUTHORIZATION_HEADER,
                message: "인증 헤더를 찾을 수 없음",
              })
            );
          }

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

          const user = schema.db.users.findBy({ id: 1 });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                id: user.id,
                name: user.name,
                ownerName: user.ownerName,
                phone: user.phone,
                email: user.email,
              },
            })
          );
        });

        this.put("/api/v1/diaries/:diaryId", (schema, request) => {
          const {
            params: { diaryId },
            requestBody,
          } = request;

          const diary: DiaryWriteFormFieldValues = JSON.parse(requestBody);

          schema.db.diaries.update(+diaryId, diary);

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상" })
          );
        });

        this.post("/api/v1/gpt", (schema, request) => {
          const { requestBody } = request;

          const { details } = JSON.parse(requestBody);

          return new Response(
            httpStatus.CREATED,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                content: `${details}로 부터 생성된 일기 내용`,
              },
            })
          );
        });

        this.get("/api/v1/guides", (schema, request) => {
          const guides = schema.db.guides;

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                guides,
              },
            })
          );
        });

        this.get("/api/v1/guides/:guideId/details", (schema, request) => {
          const {
            params: { guideId: findGuideId },
          } = request;

          const details = schema.db.details.filter(
            ({ guideId }) => guideId === +findGuideId
          );

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                details,
              },
            })
          );
        });

        /**
         * [GET] 공유용 일기 uuid 조회
         */
        this.get("/api/v1/diaries/:id/share-uuid", (schema, request) => {
          const {
            params: { id },
          } = request;

          const diary = schema.db.diaries.findBy({ id });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: { uuid: diary.uuid },
            })
          );
        });

        /**
         * [GET] 공유 일기 조회
         */
        this.get("/api/v1/diaries/shared/:id", (schema, request) => {
          const {
            params: { id },
          } = request;

          const diary = schema.db.diaries.findBy({ id });

          if (!diary) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.DIARY_NOT_FOUND,
                message: "해당하는 일기를 찾을 수 없습니다.",
              })
            );
          }

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상", data: diary })
          );
        });

        /**
         * [GET] 일기 조회
         */
        this.get("/api/v1/diaries/:id", (schema, request) => {
          const {
            params: { id },
          } = request;

          const diary = schema.db.diaries.findBy({ id });

          if (!diary) {
            return new Response(
              httpStatus.BAD_REQUEST,
              {},
              resBodyTemplate({
                code: CODE.DIARY_NOT_FOUND,
                message: "해당하는 일기를 찾을 수 없습니다.",
              })
            );
          }

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({ code: CODE.OK, message: "정상", data: diary })
          );
        });

        /**
         * [GET] 로그인 여부 확인
         */
        this.get("/api/v1/kindergartens/me", (schema, request) => {
          const {
            requestHeaders: { Authorization },
          } = request;

          if (!Authorization) {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.NO_AUTHORIZATION_HEADER,
                message: "인증 헤더를 찾을 수 없음",
              })
            );
          }

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

          const user = schema.db.users.findBy({ id: 1 });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
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

          if (!Authorization) {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.NO_AUTHORIZATION_HEADER,
                message: "인증 헤더를 찾을 수 없음",
              })
            );
          }

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

          const filteredDiaries = schema.db.diaries.filter(({ date }) => {
            const currentDate = new Date(date);

            return (
              currentDate.getFullYear() === +year &&
              currentDate.getMonth() + 1 === +month
            );
          });

          return new Response(
            httpStatus.OK,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                diaries: filteredDiaries,
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

          if (!Authorization) {
            return new Response(
              httpStatus.UNAUTHORIZED,
              {},
              resBodyTemplate({
                code: CODE.NO_AUTHORIZATION_HEADER,
                message: "인증 헤더를 찾을 수 없음",
              })
            );
          }

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
              data: {
                diaries: diaries.map((diary) => {
                  const { id, date, imageIds, createdAt } = diary;
                  return {
                    id,
                    date,
                    createdAt,
                    imageIds,
                  };
                }),
              },
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

        this.post("/api/v1/diaries", (schema, request) => {
          const { requestBody } = request;

          const diary = JSON.parse(requestBody);

          const newDiary = schema.db.diaries.insert(diary);

          return new Response(
            httpStatus.CREATED,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                savedId: newDiary.id,
              },
            })
          );
        });

        /**
         * [POST] 이미지 업로드
         */
        this.post("/api/v1/images", (schema, request) => {
          // TODO: 확장자에 대한 예외응답 생성

          return new Response(
            httpStatus.CREATED,
            {},
            resBodyTemplate({
              code: CODE.OK,
              message: "정상",
              data: {
                images: [{ id: createRandomNumberInRange(1, 7), url: "" }],
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
          id: 1,
          name: "유치원이름",
          email: "meommu@exam.com",
          ownerName: "김숙자",
          phone: "010-1234-5678",
          password: "Password1!",
          createdAt: "2023-10-26T17:42:18.744742",
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
          uuid: 3,
        },
        {
          id: 2,
          date: "2023-10-26",
          dogName: "똘이",
          createdAt: "2023-10-26T17:42:18.744742",
          imageIds: [1, 2, 3, 4, 5],
          title: "일기 2 제목 일기 2 제목 일기 2",
          content:
            "일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 일기 2 내용 ",
          uuid: 2,
        },
        {
          id: 1,
          date: "2022-05-25",
          dogName: "코코",
          createdAt: "2023-05-25T17:42:18.744735",
          imageIds: [1, 2, 3, 4, 5],
          title: "일기 1 제목",
          content: "일기 1 내용",
          uuid: 1,
        },
        {
          id: 4,
          date: "2023-10-25",
          dogName: "코코",
          createdAt: "2023-10-25T17:42:18.744735",
          imageIds: [4, 5],
          title: "일기 4 제목",
          content: "일기 4 내용",
          uuid: 4,
        },
      ],
      guides: [
        {
          id: 1,
          guide: "🌿 산책에 관한 일상",
          description: "산책할 때 어떤 일이 있었나요?",
        },
        {
          id: 2,
          guide: "😴 낮잠에 관한 일상",
          description: "낮잠을 잘 때 어떤 일이 있었나요?",
        },
        {
          id: 3,
          guide: "⚽︎ 놀이에 관한 일상",
          description: "놀 때 어떤 일이 있었나요?",
        },
        {
          id: 4,
          guide: "🍫 간식에 관한 일상",
          description: "간식을 먹을 때 어떤 일이 있었나요?",
        },
      ],
      details: [
        {
          id: 1,
          guideId: 1,
          detail: "산책을 오래 했어요.",
        },
        {
          id: 2,
          guideId: 1,
          detail: "산책을 조금 했어요.",
        },
        {
          id: 3,
          guideId: 1,
          detail: "산책 중 친한 강아지를 만나 대화 했어요.",
        },
        {
          id: 4,
          guideId: 1,
          detail: "걸음을 아주 아주 천천히 걸었어요.",
        },
        {
          id: 5,
          guideId: 2,
          detail: "낮잠을 오래 잤어요.",
        },
        {
          id: 6,
          guideId: 2,
          detail: "선생님의 품에 안겨잤어요.",
        },
        {
          id: 7,
          guideId: 3,
          detail: "놀이 중 친한 강아지를 만나 대화 했어요.",
        },
        {
          id: 8,
          guideId: 4,
          detail: "맛있는 간식을 많이 먹었어요.",
        },
      ],
    });

    window.server = server;
  }
}
