import { LoginInput } from './components/atoms/loginInput/loginInput.js'

const root = document.getElementById('root');
const loginInput = new LoginInput(root);
loginInput.render();