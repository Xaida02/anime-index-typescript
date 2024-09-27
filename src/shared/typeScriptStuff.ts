export enum Pages {
  home = "home",
  about = "about",
  myList = "myList",
}
export interface AppContextType {
  loading: boolean;
  name: string;
  animeList: any[];
  url: string;
  isUserLogged: boolean;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAnimeList: React.Dispatch<React.SetStateAction<any[]>>;
  formatToLinkType: (input: string) => string;
  adaptString: (str: string, max: number) => string;
  signUp: (email: string, password: string, userName: string) => void;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  setIsUserLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserData {
  savedShows: any[];
  userName: string;
}
