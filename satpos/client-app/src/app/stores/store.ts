import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import SiteAnalyticsStore from "./SiteAnalyticsStore";
import UserStore from "./userStore";

interface Store{
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    siteAnalyticsStore:SiteAnalyticsStore;
}

export const store: Store={
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    siteAnalyticsStore: new SiteAnalyticsStore(),
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}