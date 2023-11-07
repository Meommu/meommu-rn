export const enum CODE {
  /**
   * 성공적으로 요청이 처리되거나, 리소스가 생성되었을 경우 코드
   */
  "OK" = "0000",

  /**
   * 이메일이 중복되었을 경우 코드
   */
  "EMAIL_DUP" = "K001",

  /**
   * 이메일 형식이 잘못되었을 경우 코드
   */
  "BAD_EMAIL" = "K002",

  /**
   * 잘못된 요청일 경우 코드
   */
  "BAD_REQUEST" = "C400",

  /**
   * 지원하지 않는 토큰 형식
   */
  "UNSUPPORTED_JWT" = "A001",

  /**
   * 토큰 기한이 만료
   */
  "EXPIRED_JWT" = "A002",

  /**
   * 토큰 값이 유효하지 않음
   */
  "MALFORMED_JWT" = "A003",

  /**
   * 토큰의 서명이 잘못됨
   */
  "INVALID_SIGNATURE" = "A004",

  /**
   * 인증 헤더를 찾을 수 없음
   */
  "NO_AUTHORIZATION_HEADER" = "A005",

  /**
   * 인증 헤더 포멧이 올바르지 않음
   */
  "INVALID_HEADER_FORMAT" = "A006",

  /**
   * 로그인에 실패한 경우 코드
   */
  "LOGIN_FAILED" = "A007",

  /**
   * 해당 리소스에 접근 권한이 없음
   */
  "NOT_AUTHORITY" = "A008",

  /**
   * 알수없는 에러가 발생했을 경우 코드
   */
  "INTERNAL_SERVER_ERROR" = "S500",
  "JSON_PROCESSING_ERROR" = "S501",

  /**
   * id로 이미지를 찾을 수 없음
   */
  "IMAGE_NOT_FOUND" = "I001",
}
