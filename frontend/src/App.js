import React, { useState, useEffect } from "react";

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
      setPassword("");
      setMessage(
        isLogin ? "Login successful!" : "Signup successful! You can now log in."
      );
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("/api/check-auth/", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedIn(true);
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkLogin();
  }, []);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleLogout = async () => {
    const csrftoken = getCookie("csrftoken");

    const response = await fetch("/api/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });

    if (response.ok) {
      setLoggedIn(false);
      setUsername("");
      setPassword("");
      setMessage("Logged out successfully.");
    } else {
      const data = await response.json();
      setMessage(data.error || "Logout failed.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h2>Hangout App</h2>

      {loggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
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
