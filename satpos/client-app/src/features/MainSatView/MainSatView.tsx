import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoogleAd from '../../app/common/utils/GoogleAd';
import LoadingComponent from '../../app/layout/LoadingComponents';
import { useStore } from '../../app/stores/store';
import SatScreen from './SatScreen';

export default observer(function MainSatView() {      

    
    const { siteAnalyticsStore } = useStore();
    
    const { tlestringStore } = useStore();
    const { loadObjects } = tlestringStore;
    const { userStore: {user}} = useStore();
  
    useEffect(() => {
        if(tlestringStore.tlestringRegistry.size <= 1) loadObjects();
    },[tlestringStore.tlestringRegistry.size, loadObjects])
  
  
    if(tlestringStore.loading) return <LoadingComponent content='Loading objects...' />


    return(
        <Container>
            <div style={{height: '64vh', width: '64vw'}} >
                <SatScreen  isEditmode={false}  isAutoAnimationExec={false}/>
            </div>
            {
            //<GoogleAd pid={siteAnalyticsStore.GoogleAdsensePublisherId!} uid={siteAnalyticsStore.GoogleAdsenseUnitId!} />
            }
        </Container>

        
    )
})