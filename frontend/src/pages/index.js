import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../components/Loading';
import Home from './Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
	const { loading, loadingText } = useSelector(state => state.flow);

	return (
		<>
			<ToastContainer pauseOnFocusLoss={false} autoClose={5000} hideProgressBar={false} closeOnClick />
			<Loading loading={loading} loadingText={loadingText}>
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