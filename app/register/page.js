"use client";

export default function Register() {
  const checking = async (e) => {
    e.preventDefault();
    
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      alert("빈칸을 채워주십시요");
      return false;
    }

    // 폼 데이터 전송
    const formData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        alert('회원가입 성공!');
        window.location.href = "/";
      } else if (response.status === 409) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('폼 제출 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <form onSubmit={checking}>
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
