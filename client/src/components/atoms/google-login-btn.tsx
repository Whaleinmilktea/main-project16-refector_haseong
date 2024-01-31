import { signInWithPopup } from "@firebase/auth";
import GoogleLogo from "../../assets/google-icon.png";
import styled from "styled-components";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const GoogleLoginBtn = () => {
  const navigate = useNavigate();
  const submitGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
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
        <button onClick={submitGoogle}>
          <img src={GoogleLogo} alt="github-login" />
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

export default GoogleLoginBtn;
