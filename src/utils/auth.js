// Mock authentication for Stage 1 project
export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        reject(new Error("Email and password are required"));
        return;
      }

      if (password.length < 6) {
        reject(new Error("Password must be at least 6 characters"));
        return;
      }

      // Mock successful login
      const user = {
        email: email,
        name: email.split("@")[0],
      };

      // Store user data for later retrieval
      localStorage.setItem("mock-user-data", JSON.stringify(user));

      resolve({
        token: "mock-jwt-token-" + Date.now(),
        user: user,
      });
    }, 1000);
  });
};

export const register = (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password || !name) {
        reject(new Error("All fields are required"));
        return;
      }

      if (password.length < 6) {
        reject(new Error("Password must be at least 6 characters"));
        return;
      }

      // Mock successful registration
      const user = {
        email: email,
        name: name,
      };

      // Store user data for later retrieval
      localStorage.setItem("mock-user-data", JSON.stringify(user));

      resolve({
        message: "Registration successful",
        user: user,
      });
    }, 1000);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token || !token.startsWith("mock-jwt-token-")) {
        reject(new Error("Invalid token"));
        return;
      }

      // Extract user info from token (mock implementation)
      const userData = localStorage.getItem("mock-user-data");

      if (userData) {
        try {
          const user = JSON.parse(userData);
          resolve(user);
        } catch {
          resolve({
            email: "user@example.com",
            name: "User",
          });
        }
      } else {
        resolve({
          email: "user@example.com",
          name: "User",
        });
      }
    }, 500);
  });
};
