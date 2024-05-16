import "./App.css";
import config from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes } from "@aws-amplify/auth";
import { useEffect, useState } from "react";

Amplify.configure(config);

function App() {
  const [userAttributes, setUserAttributes] = useState({ name: "" });

  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
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
        console.log(user); // 여기에 콘솔 로그를 추가
        // Function to print access token and id token
        const printUserAttributes = async () => {
          try {
            const userAttributes = await fetchUserAttributes();
            console.log("Name:", userAttributes.name);
          } catch (e) {
            console.log(e);
          }
        };

        return (
          <div className="App">
            <header className="App-header">
              <h1>Hello {userAttributes.name}</h1>
              <button onClick={signOut}>Sign out</button>
              <button onClick={printUserAttributes}>Print Attributes</button>
            </header>
          </div>
        );
      }}
    </Authenticator>
  );
}

export default App;
