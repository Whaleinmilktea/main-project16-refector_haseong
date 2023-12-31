import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/edusync-logo.png";
import User from "./User";
import tokenRequestApi from "../../apis/TokenRequestApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { LogInState } from "../../recoil/atoms/LogInState";
import { RenderingState } from "../../recoil/atoms/RenderingState";

const GNB = () => {
  const [profileImage, setProfileImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LogInState);
  const isRendering = useRecoilValue(RenderingState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      tokenRequestApi.get("/members").then((res) => {
        setProfileImage(res.data.image);
        setIsLoading(false);
      });
    }
    setIsLoading(false);
  }, [isLoggedIn, isRendering]);
  return (
    <>
      {isLoading ? (
        <GNBDiv>
          <GNBBlock>
            <HomeLink to="/">
              <img src={logo} />
            </HomeLink>
          </GNBBlock>
        </GNBDiv>
      ) : (
        <GNBDiv>
          <GNBBlock>
            <HomeLink to="/">
              <img src={logo} />
            </HomeLink>
          </GNBBlock>
          <GNBMenuBlock>
            <Link to="/studylist">
              <span>스터디 목록</span>
            </Link>
            <Link to="/studypost">
              <span>스터디 등록</span>
            </Link>
            <Link to="/profile/manage-group">
              <span>스터디 관리</span>
            </Link>
            <Link to="/calendar">
              <span>나의 캘린더</span>
            </Link>
          </GNBMenuBlock>
          <User
            profileImage={profileImage}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </GNBDiv>
      )}
    </>
  );
};

const GNBDiv = styled.div`
  background-color: #ffffff;
  font-size: 13px;
  width: 100%;
  padding: 4px;
  box-shadow: 0px 2px 5px #adb3cd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0%;
  left: 0%;
  position: fixed;
  z-index: 10000;
`;

const GNBBlock = styled.div`
  width: 200px;
  display: flex;
`;
const GNBMenuBlock = styled(GNBBlock)`
  width: 500px;
  justify-content: space-between;

  span {
    font-size: 15px;
    font-weight: 500;
  }
  span:hover {
    opacity: 80%;
  }
  span:active {
    opacity: 100%;
  }
  a {
    color: #2759a2;
  }
`;

const HomeLink = styled(Link)`
  img {
    height: 38px;
    margin-top: 4px;
  }
`;

export default GNB;
