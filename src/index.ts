import './index.scss';
import router, { AppPage } from '@router';
import store from '@store';

// DEBUG 
store.setState('myID', 2);
router.navigateTo(AppPage.Feed);
