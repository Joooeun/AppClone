interface IUserInfo {
    first: boolean;
}

interface IUserContext {
    isLoading: boolean;
    userInfo: IUserInfo | undefined;
    login: (first: boolean) => void;
    getUserInfo: () => void;
    logout: () => void;
    geo : boolean;
    checkgeo: (geo: boolean) => void;
}