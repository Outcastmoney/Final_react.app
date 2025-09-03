export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error('Email and password are required'));
        return;
      }
      
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }
      
      const user = {
        email: email,
        name: email.split('@')[0]
      };
      
      localStorage.setItem('mock-user-data', JSON.stringify(user));
      
      resolve({
        token: 'mock-jwt-token-' + Date.now(),
        user: user
      });
    }, 1000);
  });
};

export const register = (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password || !name) {
        reject(new Error('All fields are required'));
        return;
      }
      
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }
      
      const user = {
        email: email,
        name: name
      };
      
      localStorage.setItem('mock-user-data', JSON.stringify(user));
      
      resolve({
        message: 'Registration successful',
        user: user
      });
    }, 1000);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token || !token.startsWith('mock-jwt-token-')) {
        reject(new Error('Invalid token'));
        return;
      }
      
      const userData = localStorage.getItem('mock-user-data');
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          resolve(user);
        } catch {
          resolve({
            email: 'user@example.com',
            name: 'User'
          });
        }
      } else {
        resolve({
          email: 'user@example.com',
          name: 'User'
        });
      }
    }, 500);
  });
};
