import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContextType, UserData } from "./typeScriptStuff";
import { db, auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const AppProvider = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    savedShows: [],
    userName: "",
  });

  // THIS API ISN'T OWNED BY ME AND IS ACCESSIBLE AT NO COST
  const url = "https://api.jikan.moe/v4/anime?q=";

  // FIRESTORE FUNCTIONS
  const signUp = (email: string, password: string, userName: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // user created successfully, write user data to database
        setDoc(doc(db, "users", email), {
          savedShows: [],
          userName: userName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out."))
      .then(() => window.location.reload())
      .catch(() => console.log("Failed to log out."));
  };
  // const checkUser = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsUserLogged(true);
  //     } else {
  //       setIsUserLogged(false);
  //     }
  //   });
  // };
  const fetchData = useCallback(
    async (link: string, retries: number = 6, delay: number = 1000) => {
      try {
        setLoading(true);
        const response = await fetch(link + name);
        console.log(response);
        if (!response.ok) {
          console.error("Error occurred with status: " + response.status);
          if (retries > 0) {
            console.log(
              `Retrying in ${delay / 1000} seconds... (${retries} retries left)`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchData(link, retries - 1, delay * 2);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        const apiData = await response.json();
        const newAnimeList = apiData.data;
        setAnimeList(newAnimeList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [name]
  );

  // CHECK IF THERE'S AN USER
  // useEffect(() => {
  // checkUser();
  // },[])

  // GET USER SPECIFIC DATA
  const getUserData = async (email: string) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as UserData;
      setUserData(userData);
      console.log(userData);
    } else {
      console.log("No user found with this email.");
    }
  };

  // UPDATE DATA WITH FIRESTORE SNAPSHOT
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setIsUserLogged(true);

        getUserData(user.email);
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.email),
          (doc) => {
            if (doc.exists()) {
              const data = doc.data() as UserData;
              setUserData(data);
              console.log("Current user data: ", data);
            } else {
              console.log("No document found for this user.");
            }
          }
        );
        return () => unsubscribeSnapshot();
      } else {
        setIsUserLogged(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        getUserData(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchData(url);
  }, [fetchData, name]);
  const adaptString = (str: string, max: number) =>
    str.length < max - 1 ? str : str.substring(0, max) + "...";
  const formatToLinkType = (input: string) =>
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "+")
      .replace(/^(\+)+|(\+)+$/g, "");

  return (
    <AppContext.Provider
      value={{
        loading,
        formatToLinkType,
        setLoading,
        adaptString,
        name,
        setName,
        setAnimeList,
        url,
        signIn,
        setIsUserLogged,
        isUserLogged,
        animeList,
        userData,
        setUserData,
        signUp,
        logOut,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
