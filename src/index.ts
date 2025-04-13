import './index.scss';
import router, { AppPage } from '@router';
import store from '@store';

store.setState('currentPage', []);

// DEBUG 
// store.setState('myID', 2);
router.navigateTo(AppPage.Auth);
