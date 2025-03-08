import Logo from "../../pattern/logo/logo.js";

const LOGO_MAIN = {
	type: "main",
	png_name: "logo main 50.png",
}

export default class LogoMain extends Logo {
	constructor(parentElement) {
		super(parentElement, LOGO_MAIN);
	}
}