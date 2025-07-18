// Dummy user for demo
const users = [
  { username: 'admin', password: '123456', role: 'admin' },
  { username: 'user', password: 'password', role: 'user' }
];

exports.login = async (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // In real app, generate JWT here
    return { success: true, message: 'Login successful', user: { username: user.username, role: user.role } };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
};
