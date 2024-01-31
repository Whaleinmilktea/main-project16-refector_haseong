import { signInWithPopup } from "@firebase/auth";
import GithubLogo from "../../assets/github-icon.png";
import styled from "styled-components";
import { auth, githubProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const GithubLoginBtn = () => {
  const navigate = useNavigate();
  const submitGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      // const user = result.user;
      // const profileImage = user?.providerData[0];
      // const nickName = user?.displayName;
      navigate("/");
      // console.log(credential);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.name, error.message);
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Wrapper>
        <button onClick={submitGithub}>
          <img src={GithubLogo} alt="github-login" />
        </button>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  button {
    width: 100%;
    height: 100%;
    cursor: pointer;
    img {
      width: 46px;
      border-radius: 50%;
      margin: 15px;
    }
  }
`;

export default GithubLoginBtn;
