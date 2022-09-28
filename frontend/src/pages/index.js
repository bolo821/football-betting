import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../components/share/Loading';
import Home from './Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
	return (
		<>
			<ToastContainer pauseOnFocusLoss={false} autoClose={5000} hideProgressBar={false} closeOnClick />
			<Loading loading={false} loadingText={""}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</Router>
			</Loading>
		</>
	);
}

export default Index;