import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTokenFromCookie,
  removeAuthorization,
} from "./utils/authorizations";
import { clearUser, setUser } from "@/app/redux/slices/userSlice";
import { UserType } from "./types/user";

type Props = {
  needAuth?: boolean;
  needAdmin?: boolean;
  children: React.ReactNode;
};

const AuthWrapper = ({ needAuth, needAdmin, children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const getMe = async (): Promise<UserType> => {
    return { id: 1, email: "test@example.com", isAdmin: false };
  };

  const checkAuth = async () => {
    if (!user || !user.id) {
      const token = getTokenFromCookie();
      if (!token && needAuth) {
        navigate("/login");
      }
      if (token) {
        try {
          const user = await getMe();
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
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
