export default function Register() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <label>이름</label>
        <input c name="name" type="text" placeholder="이름" />
        <label>이메일</label>
        <input name="email" type="text" placeholder="이메일" />
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          minLength={6}
          maxLength={12}
          placeholder="비번"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
