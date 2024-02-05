interface IEscapeMap {
  [key: string]: string;
}

export function sanitizeInput(input: string): string {
  // HTML 특수 문자를 이스케이프하여 스크립트 실행을 방지
  const escapeMap: IEscapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  const filterHTML = (text: string) => {
    return text.replace(/[&<>"']/g, (match) => escapeMap[match]);
  };

  // 스크립트 태그를 제거
  const removeScriptTags = (text: string) => {
    return text.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  // 이스케이프와 스크립트 태그 제거를 순차적으로 적용
  let sanitizedInput = removeScriptTags(input);
  sanitizedInput = filterHTML(sanitizedInput);
  return sanitizedInput;
}
