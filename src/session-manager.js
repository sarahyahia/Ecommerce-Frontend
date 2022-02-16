import store from "@/store/index";
import router from "@/router/index";
import isAfter from "date-fns/isAfter";
import subtractMinutes from "date-fns/subMinutes";
// import addSeconds from "date-fns/addSeconds";
import AuthService from '@/services/AuthService.js';
// import differenceInMinutes from "date-fns/difference_in_minutes";
import differenceInMilliSeconds from "date-fns/differenceInMilliseconds";

export {initSession};

//Irrelevent code omitted

function initSession() {
    return new Promise(() => {
        let tokenExpiryDate = store.getters.getTokenExpiry;
        if (!tokenExpiryDate) {
            console.log("No token expiry date. user probably never logged in");
            return logout();
        }

        let oneMinuteBeforeExpiry = subtractMinutes(tokenExpiryDate, 1);//If the token has expired or will expire in the next 30 minutes
        const now = new Date();

        if (isAfter(now, oneMinuteBeforeExpiry)) { //If the token has expired or will expire in the next 10 minutes
            console.log("Token expired/will expire in the next 1 minutes");
            return getAccessToken();
        }

        console.log("Token Ok. Expiring at " + tokenExpiryDate);
        setTimeout(getAccessToken, differenceInMilliSeconds(oneMinuteBeforeExpiry, now));
    });
}

async function getAccessToken() {
    const response = await AuthService.refresh(this.$store.getters.getRefreshToken);
    const access = response.access
    this.$store.dispatch('accessToken', {access});
}


async function logout() {
    const response = await AuthService.logout(store.getters.getRefreshToken);
    // store.dispatch('changeMsgValue', response.msg)
    store.dispatch('logout', response);
    router.push('/signin');
}
//Irrelevent code omitted