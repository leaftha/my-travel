"use client";

export default function Register() {
  const checking = (e) => {
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.email.value;

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      alert("빈칸을 채워주십시요");
      e.preventDefault();
      return false;
    }

    return true;
  };

  return (
    <div>
      <form method="POST" action="/api/auth/signup" onSubmit={checking}>
        <label>이름</label>
        <input name="name" type="text" placeholder="이름" />
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
