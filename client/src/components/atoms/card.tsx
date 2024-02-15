import styled from "styled-components";
import { SiReact } from "react-icons/si";

const Card = () => {

  return (
    <Wrapper>
      <Image>
        <SiReact color="#61DAFB" size={24}/>
      </Image>
      <Title></Title>
      <Date></Date>
      <Summary></Summary>
      <Like></Like>
      <View></View>
    </Wrapper> 
  );
};

export default Card;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding: 10px;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e1e4e8;
  border-radius: 10px;
`;

const Title = styled.div`
  margin: 20px 0px 10px 0;
  font-size: 1.5rem;
`;

const Date = styled.div`
  margin: 10px 0px 10px 0;
  font-size: 1rem;
`;

const Summary = styled.div`
  margin: 10px 0px 10px 0;
  font-size: 1rem;
`;

const Like = styled.div`
  margin: 10px 0px 10px 0;
  font-size: 1rem;
`;

const View = styled.div`
  margin: 10px 0px 10px 0;
  font-size: 1rem;
`;
