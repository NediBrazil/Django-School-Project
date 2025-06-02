import React, { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const handleapi = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/login/" : "/api/signup/";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoggedIn(true);
      setMessage(
        isLogin ? "Login successful!" : "Signup successful! You can now log in."
      );
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout/", {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    setMessage("Logged out successfully.");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h2>Hangout App</h2>

      {loggedIn ? (
        <div>
          <p>{message}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <form onSubmit={handleapi}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          </form>
          <p>{message}</p>
          <p>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
