import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import RegisterForm from '../../features/users/RegisterForm';
import Privacy from '../../features/Privacy/Privacy';
import { GoogleAdHead } from '../common/utils/GoogleAdHead';
import WebsiteSettingDashboard from '../../features/WebsiteSetting/dashboard/WebsiteSettingDashboard';
import WebsiteSettingForm from '../../features/WebsiteSetting/form/WebsiteSettingForm';
import useTrackingGA4 from '../common/utils/useTrackingGA4';
import { RouteAuthChk } from '../common/RouteAuthChk';
import MainSatView from '../../features/MainSatView/MainSatView';

function App() {

  
  const {siteAnalyticsStore} = useStore();
  
  useEffect(() => {
    GoogleAdHead(siteAnalyticsStore.GoogleAdsensePublisherId!)
  }, [siteAnalyticsStore.GoogleAdsensePublisherId]);

  useTrackingGA4();



  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setAppLoaded());

    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app ...' />

  return (
    <>
      <ToastContainer position ='bottom-right' hideProgressBar />
      <ModalContainer />
      <NavBar />
      <div className="container-fluid">
            <Routes>
                <Route path = '/' element={<MainSatView />} />

                <Route path = '/websitesettings' element={ <RouteAuthChk component={<WebsiteSettingDashboard />} redirect="/login" isauth={true} /> } />
                <Route key = {location.key} path = '/websitesettingedit/:id' element={ <RouteAuthChk component={<WebsiteSettingForm />} redirect="/login" isauth={true} /> } />
                <Route key = {location.key} path = '/websitesettingcreate' element={ <RouteAuthChk component={<WebsiteSettingForm />} redirect="/login" isauth={true} /> } />
                
                

                <Route path='/errors' element={<TestErrors />} />
                <Route path='/server-error' element={<ServerError />} />
                <Route path='/login' element={ <RouteAuthChk component={<LoginForm />} redirect="/" isauth={false} /> } />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
      </div>    
    </>
  );
}

export default observer(App);
