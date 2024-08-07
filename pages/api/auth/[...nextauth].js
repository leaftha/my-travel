import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("travel");
        let user = await db
          .collection("user_id")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_Google_Client_ID,
      clientSecret: process.env.NEXT_PUBLIC_Google_Client_Secret,
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, //1일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.weight = user.weight;
        token.user.inbody = user.inbody;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },

    async signIn({ user, account }) {
      try {
        let db = (await connectDB).db("travel");
        let result = await db
          .collection("user_id")
          .find({ email: user.email })
          .toArray();
        if (result.length === 0) {
          const user_info = {
            provider: account.provider,
            email: user.email,
            name: user.name,
            likes: [],
          };
          await db.collection("user_id").insertOne(user_info);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
