export const renderMessage = (isPasswordValid : boolean | null) => {
  if (isPasswordValid === false) {
    return (
      <p
        style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#C51605",
        }}
      >
        비밀번호는 8~25자리의 영문, 숫자, 특수문자 조합이어야 합니다
      </p>
    );
  } else if (isPasswordValid === true) {
    return (
      <p
        style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#4682A9",
        }}
      >
        사용할 수 있는 비밀번호입니다
      </p>
    );
  } else {
    return null;
  }
};
