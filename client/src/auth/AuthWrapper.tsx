import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTokenFromCookie,
  parseJwt,
  removeAuthorization,
} from "./utils/authorizations";
import { clearUser, setUser } from "@/app/redux/slices/userSlice";

type Props = {
  needAuth?: boolean;
  needAdmin?: boolean;
  children: React.ReactNode;
};

const AuthWrapper = ({ needAuth, needAdmin, children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  console.log(user);

  const checkAuth = async () => {
    if (!user || !user.id) {
      console.log("no user");
      const token = getTokenFromCookie();
      if (!token && needAuth) {
        navigate("/login");
      }
      if (token) {
        try {
          const jwt = parseJwt(token);
          const user = {
            id: jwt._id,
            email: jwt.email,
            isAdmin: true,
          };
          dispatch(setUser(user));
        } catch (error) {
          removeAuthorization();
          dispatch(clearUser());
          if (needAuth) {
            navigate("/login");
          }
        }

        if (needAdmin && !user.isAdmin) {
          navigate("/");
        }
        console.log(user);
        console.log(needAdmin);
        console.log(user.isAdmin);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
