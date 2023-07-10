import { ReactNode, createContext, useContext, useState } from "react";

const UserContextDefaultValues = {
  id: 0,
  name: "",
  email: "",
  avatar: {
    b64: "",
    type: "",
  },
  setId: (userId) => {},
  setName: (name) => {},
  setEmail: (email) => {},
  setAvatar: (b64) => {},
};

const UserContext = createContext(UserContextDefaultValues);

export function useUserContext() {
  return useContext(UserContext);
}


export function UserProvider({ children }) {
  const [id, setUserId] = useState(0);
  const [name, setname] = useState("");
  const [email, setmail] = useState("");
  const [avatar, setavatar] = useState({
    b64: "",
    type: "",
  });

  const setId = (userid) => {
    setUserId(userid);
  };

  const setEmail = (mail) => {
    setmail(mail);
  };
  const setName = (mail) => {
    setname(mail);
  };

  const setAvatar = (b64) => {
    const signatures = {
      JVBERi0: "application/pdf",
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      "/9j/4": "image/jpeg",
      "/9j/": "image/jpg",
    };
    setavatar((prev) => ({ ...prev, b64: b64 }));

    for (let sign in signatures)
      if (b64.startsWith(sign))
        setavatar((prev) => ({
          ...prev,
          type: signatures[sign],
        }));
  };

  const value = {
    id,
    name,
    email,
    avatar,
    setId,
    setName,
    setEmail,
    setAvatar,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}
