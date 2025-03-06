class Router {
	constructor() {
		const root = document.getElementById('root');
		// const this.regPage = new RegPage(root)
	}

	navigateTo(page) {
		switch (page) {
			case 'Registratoin':
				this.regPage.render()
		}
	}

}

const router = new Router();
export default router;
