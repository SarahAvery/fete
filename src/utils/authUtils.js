import { history, Routes } from "../components/Application";

const getToken = () => localStorage.getItem("Fete.authorization");
const setToken = (token) => {
  if (token !== null && token !== undefined) {
    localStorage.setItem("Fete.authorization", token);
  }
};
export const isLoggedIn = () => !!getToken();

class AuthManager {
  /**
   * Retreives user data from the api using the token in localStorage
   */
  getUser = () => {
    const token = getToken();

    return fetch("/api/user/me", {
      method: "GET",
      headers: { authorization: `Bearer: ${token}` },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        return { email: true };
      } else if (res.status === 403 || res.status === 401) {
        return { authenticated: true };
      } else {
        throw Error(res.statusText);
      }
    });
  };

  /**
   * Attempt user login with provided token
   */
  tryLogin = () => {
    const token = getToken();

    return new Promise((resolve, reject) => {
      if (token) {
        this.getUser()
          .then(resolve)
          .catch((err) => reject(err));
      } else {
        resolve(undefined);
      }
    });
  };

  /**
   * Attempt user login with provided email/password
   */
  tryUserLogin = (email, password) => {
    return fetch("http://localhost:8002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.accessToken);

        return this.getUser();
      });
  };

  logout = () => {
    localStorage.clear("Fete.authorization");
    history.replace(Routes.home);
    return true;
  };

  tryUserRegistration = (email, password) => {
    return fetch("http://localhost:8002/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 403) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data) => {
        setToken(data.accessToken);

        return this.getUser();
      });
  };
}

export const authManager = new AuthManager();
