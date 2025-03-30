import './index.scss';
import router from '@router';
import store from '@store';

// DEBUG 
store.setState('myID', 2);
router.navigateTo('feed');
