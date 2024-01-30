import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { LogInState } from "../../recoil/atoms/LogInState";
import UserImg from "../atoms/user-img";

const User = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LogInState);
  // const [isLoading, setIsLoading] = useState(false);

  const signOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <UserDiv>
          <ProfileLink to="/profile">
            <UserImg />
          </ProfileLink>
          <button onClick={signOut}>로그아웃</button>
        </UserDiv>
      ) : (
        <UserDiv>
          <Link to="/signin">
            <button>로그인</button>
          </Link>
          <Link to="signup">
            <button>회원가입</button>
          </Link>
        </UserDiv>
      )}
    </>
  );
};
const UserDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 200px;
  button {
    margin-left: 7px;
    font-size: 15px;
    font-weight: 500;
    color: #2759a2;
  }
`;
const ProfileLink = styled(Link)`
  div {
    width: 33px;
    height: 33px;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 10px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default User;
