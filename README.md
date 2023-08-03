<h1>EduSync</h1>

- [프론트엔드 배포 Link](http://edusync-refector.s3-website-us-east-1.amazonaws.com/)
- [백엔드 배포 Link](http://ec2-3-36-48-195.ap-northeast-2.compute.amazonaws.com)

<br>

## 👋 Introduce Repository

- **_소개_** : 코드스테이츠에서 2023.04.28 ~ 2023.05.25 기간동안 진행했던 메인프로젝트의 리팩토링을 진행한 레포지토리입니다.
- **_주요 개선점_** : 코드의 캡슐화+모듈화, React-query 및 React-Testing-Library 적용

<br>

## 🧑‍🤝‍🧑 Participants
<table>
<thead>
<tr>

<th align="center">FE</th>
<th align="center">BE</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><a href="https://github.com/Whaleinmilktea"><img src="https://avatars.githubusercontent.com/u/109408848?v=4" alt="강하성" style="max-width: 40%;"></a></td>
<td align="center"><a href="https://github.com/yeori316"><img src="https://avatars.githubusercontent.com/u/78740368?v=4" alt="양도열" style="max-width: 40%;"></a></td>
</tr>
<tr>
<td align="center"><a href="https://whaleinmilktea.tistory.com/">강하성</a></td>
<td align="center"><a href="https://velog.io/@yeori316">양도열</a></td>
</tr>
</tbody>
</table>

<br>

## ⚒️ 주요 개선 내용

- [useQuery-Hook 적용](#usequery-hook-적용)
- [useMutation-Hook 적용](#usequery-hook-적용)
- [해시/리스트를 활용한 맵핑 함수 unit-Test](#)
- [쿼리스트링 난독화](#쿼리스트링-난독화)
- [image 업로드 요청 형식 변경 ( json -> form-data )](#이미지-업로드-시-json-형식에서-form-data-형식으로-변경)
- [인터페이스 모듈화 및 분리 + 구체적인 기능을 명시하는 변수 명으로 변경](#인터페이스-모듈화-및-분리)
- [비밀번호 유효성 검사 정규화](#비밀번호-유효성-검사-정규화)
- [무한스크롤 구현](#스터디-리스트-무한스크롤-구현)

<br>

### useQuery Hook 적용
- isLoading, isError 상태를 각 axios 요청 함수별로 따로 리팩토링이 요구되는데, 다수의 반복작업 예상
- Caching을 활용한 불필요한 요청 최소화 필요
- React-query의 hook들은 이러한 불필요한 작업을 최소화하고, 필요시 hook에 적용될 수 있는 여러 메서드를 제공하기 때문에 추후 추가적인 요청사항이 있을 시 최소한의 코드로 요청사항 반영 가능
```typescript
// 개선 전 코드
// TODO 최초 페이지 진입 시 유저의 정보를 조회하는 코드
import { useState, useEffect } from "react";
useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
  }
  const fetchMemberInfo = async () => {
    try {
      const info = await getMemberInfo(isLoggedIn);
      setMemberInfo(info);
      setIntroduceInfo({ aboutMe: info.aboutMe, withMe: info.withMe });
    } catch (error) {}
  };
  fetchMemberInfo();
}, [isModalOpen, isRendering]);
```
```typescript
// 개선 후 코드
  import { useQuery } from "@tanstack/react-query";
  const { data, isLoading, isError } = useQuery(["userInfo"], ()=>{
    return getMemberInfo(isLoggedIn);
  })
  const userInfo = data;

  if (!isLoggedIn) navigate("/login");
  if (isLoading) return <div>로딩중...</div>
  if (isError) return <div>에러가 발생했습니다.</div>
```

<br>

### useMutation Hook 적용
- isLoading, isError 상태를 각 axios 요청 함수별로 따로 리팩토링이 요구되는데, 다수의 반복작업 예상
- 수정/삭제 요청 쿼리의 단순화
```typescript
// 개선 전 코드
// TODO 최초 페이지 진입 시 유저의 정보를 조회하는 코드
import { useState, useEffect } from "react";
useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
  }
  const fetchMemberInfo = async () => {
    try {
      const info = await getMemberInfo(isLoggedIn);
      setMemberInfo(info);
      setIntroduceInfo({ aboutMe: info.aboutMe, withMe: info.withMe });
    } catch (error) {}
  };
  fetchMemberInfo();
}, [isModalOpen, isRendering]);
```
```typescript
// 개선 후 코드
  import { useQuery } from "@tanstack/react-query";
  const { data, isLoading, isError } = useQuery(["userInfo"], ()=>{
    return getMemberInfo(isLoggedIn);
  })
  const userInfo = data;

  if (!isLoggedIn) navigate("/login");
  if (isLoading) return <div>로딩중...</div>
  if (isError) return <div>에러가 발생했습니다.</div>
```

<br>

### 쿼리스트링 난독화
- 쿼리 전송단계에서 intercept시 url의 query를 조작하여 해커가 원하는 데이터를 임의로 탈취당할 우려
- 이로 인해 쿼리 요청 단계에서 utf-8 형식을 base64 형식으로 인코딩하여 쿼리 요청 적용
```typescript
// 개선 전 코드
export async function getStudyGroupInfo(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인하세요");
  const response = await tokenRequestApi.get<StudyInfoDto>(
    `/studygroup/${id}`
  );
  const studyInfo = response.data;
  ...
  return studyInfo;
}
```
```typescript
// 개선 후 코드
export async function getStudyGroupInfo(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인하세요");
  const encodeId = Base64.encode(id.toString());
  const response = await tokenRequestApi.get<StudyInfoDto>(
    `/studygroup/${encodeId}`
  );
  const studyInfo = response.data;
  ...
  return studyInfo;
}
```

<br>

### 이미지 업로드 시, JSON 형식에서 Form-data 형식으로 변경
- 이미지 업로드 시, 서버 부하로 인해 RDS에 직접 저장 대신 S3에 저장하는 로직 구현 (서버 구현 사항)
- 이 과정에서 서버 측에서 JSON 형식으로 된 데이터가 아닌 Form-data 형식으로 된 쿼리를 요청
```typescript
// 변경 전 코드

// 현재 interface는 별도로 분리하여 관리
// export interface MemberProfileUpdateImageDto {
//   profileImage: string;
// }

export const updateMemberProfileImage = async (
  data: MemberProfileUpdateImageDto
) => {
  await tokenRequestApi.patch("/members/profile-image", data);
};
```
```typescript
// 변경 후 코드
export const updateMemberProfileImage = async (
  image: MemberProfileUpdateImageDto
) => {
  if (!image.image) throw new Error("이미지를 확인해주세요.");
  const formData = new FormData();
  formData.append("image", image.image);
  await tokenRequestApi.patch("/members/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
```

<br>

### 인터페이스 모듈화 및 분리
```typescript
// 개선 전 코드
// ~/src/apis/MemberApi 에서 interface 타입 및 api 요청 통합 관리
// TODO : 유저정보 get 요청 DTO 타입 정의
export interface MemberInfoResponseDto {
  uuid: string;
  email: string;
  profileImage: string;
  nickName: string;
  aboutMe: string;
  withMe: string;
  memberStatus: "MEMBER_ACTIVE" | "MEMBER_INACTIVE";
  roles: string[];
}

// TODO: 유저정보 get 요청하는 axios 코드
export const getMemberInfo = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  // tokenRequestApi를 사용하여 /members 엔드포인트로 GET 요청 전송
  const response = await tokenRequestApi.get<MemberInfoResponseDto>("/members");
  // 응답 데이터 추출
  const data = response.data;
  return data; // 데이터 반환
};
```
```typescript
// 개선 후 코드
// types/MemberApiInterfaces
import { MemberInfoResponseDto } from "../types/MemberApiInterfaces";
// /src/apis/MemberApi
export const getMemberInfo = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<MemberInfoResponseDto>("/members");
  const data = response.data;
  return data;
};
```

<br>

### 비밀번호 유효성 검사 정규화
- 클라이언트와 서버 모두 유효성 검사 수행
- 유효성 검사 수행 시, 같은 양식의 리턴값을 공유하기 위해 유효성 검증식 정규화
```typescript
const passwordTest = (data: string) => {
  // 비밀번호는 8~25자리의 영문 대소문자, 숫자, 특수문자 조합이어야 합니다.
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/g.test(data);
  };
const handleSignUpButton = () => {
  ...
  else if (passwordTest(password) === false) alert("비밀번호는 8~25자리의 영문 대소문자, 숫자, 특수문자 조합이어야 합니다.");
  else {
    eduApi.post(`/members`, {
    ...
    }
  }
```

<br>

### 스터디 리스트 무한스크롤 구현
- 스터디 리스트의 무한스크롤 기능 추가
- 서버로 page와 size를 쿼리를 요청하는 방법으로 구현
- 무한스크롤 기능은 바닐라 JS를 활용하여 구현할 경우 쓰로틀에 의한 이벤트 과다 이슈가 있어, 이를 효과적으로 제어하는 라이브러리를 활용하여 구현
- 주석으로 처리된 부분은, 서버의 배포 이슈로 인해 임시 json-server로 테스트하여 동작여부 확인한 코드
```typescript
// ~/src/apis/StudyGroupApi.ts
export const getStudyGroupList = async (
  currentPage: number
): Promise<StudyGroupListDto[]> => {
  const requestEndpoint = Base64.encode(`$studygroups?page${currentPage}&size=6}`)
  const response = await axios.get<StudyGroupListDto[]>(
    `${import.meta.env.VITE_APP_API_URL}/list?p=${currentPage}&s=6`
  );
  // const response = await axios.get(
  //   `http://localhost:3000/list?_page=${currentPage}&_limit=6`
  // );
  return response.data;
};
```
```typescript
// ~/src/pages/StudyList
// ... dependancy
import { useInView } from "react-intersection-observer";

const StudyList = () => {
  const [ref, inView] = useInView();
  const [list, setList] = useState<StudyGroupListDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // ... 기타 states (재정렬 및 데이터 편집)
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) fetchList();
  }, [inView]);

  const fetchList = async () => {
    const res = await getStudyGroupList(currentPage);
    setList((prev) => [...prev, ...res]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    filterList(sortValue);
  }, [list]);

  const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // ... select option에 따른 이벤트 핸들링
  };

  const filterList = (sortValue: string) => {
    // ... 재정렬 조건문
  };

  return (
    <StudyListContainer>
      <StudyListBody>
          // ...
        </StudyListTop>
        <ListFilterWrapper>
          // ...
        </ListFilterWrapper>
        <StudyBoxContainer>
          {filterData?.map((item: StudyGroupListDto) => (
            <StudyBox
              key={item?.id}
              onClick={() => navigate(`/studycontent/${item?.id}`)}
            >
              <StudyListImage image={item.image}></StudyListImage>
              <div>
                <div className="studylist-title">
                  <h3>{item?.title}</h3>
                </div>
                <div className="studylist-interest">
                  <div id="studylist-interest_likes">
                    ❤️ {item?.likes}
                  </div>
                  <div id="studylist-interest_views">🧐 {item?.views}</div>
                </div>
                <div className="studylist-tag">
                  <StudyListTag item={item.tags} />
                </div>
              </div>
            </StudyBox>
          ))}
        </StudyBoxContainer>
      </StudyListBody>
      <div ref={ref}></div>
    </StudyListContainer>
  );
};

export default StudyList;

```
