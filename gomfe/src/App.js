import "./App.css";
import config from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes } from "@aws-amplify/auth";
import { useEffect, useState } from "react";

// Amplify 설정 구성 (aws-exports.js)
Amplify.configure(config);

function App() {
  // useState 선언하기
  const [userAttributes, setUserAttributes] = useState({ name: "" });
  // useEffect로 사용자 속성 저장하기
  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes(); // fetchUserAttributes : 현재 로그인된 사용자의 속성을 가져옴
        setUserAttributes(attributes);
      } catch (e) {
        console.log(e);
      }
    };
    getUserAttributes();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        return (
          <div className="App">
            <header className="App-header">
              <h1>Hello {userAttributes.name}</h1>
              <button onClick={signOut}>Sign out</button>
            </header>
          </div>
        );
      }}
    </Authenticator>
  );
}

export default App;
