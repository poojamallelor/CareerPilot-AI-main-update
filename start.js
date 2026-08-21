const { spawn } = require('child_process');

console.log('Starting CareerPilot-AI development server...');

const child = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

child.on('error', (error) => {
  console.error('Error starting server:', error);
});

child.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});