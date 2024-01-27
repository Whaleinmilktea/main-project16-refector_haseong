vitest Error

### ReferenceError: document is not defined

원인 :
- vite.config.ts에 환경설정을 해주지 않아서 발생한 문제!
- 이후 defineConfig를 수정했으나 Object literal may only specify known properties에러를 TS에서 throw
- 순수 Vite DefineConfig에 정의되지 않은 config 속성을 ts가 감지하여 extends를 허용하지 않았기 때문에 발생!

* 위의 순서에 따라 해결한 코드를 아래에 나열

```ts
import { describe, expect, test } from "vitest";
import { render,screen } from "@testing-library/react"
import SignUpForm from "../src/components/molecules/signup-form"

describe("사용자 비밃번호 입력 시 문구 전환", () => {
  test("조건에 맞지 않을 때는, '비밀번호는 8~25자리의 영문, 숫자, 특수문자 조합이어야 합니다'", () => {
    // @@ 여기서 에러 발생 @@
    render(<SignUpForm />)
  })
  // 조건에 맞을 때는, "사용할 수 있는 비밀번호"

  // 아무런 입력이 없을 때는 null
})
```

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    // @@ 여기서도 에러 발생! @@
    // ### Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'.ts(2353)
  }
})
```

```ts
// @@ 원인은 이 부분! @@
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'

```

reference : [stackoverflow](https://stackoverflow.com/questions/72146352/vitest-defineconfig-test-does-not-exist-in-type-userconfigexport#comment132444649_72149404)