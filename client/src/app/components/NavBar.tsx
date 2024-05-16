import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/NavigationMenu";
import { buttonVariants } from "@/components/Button";
import logo from "@/static/logo.svg";
import { clearUser } from "../redux/slices/userSlice";
import { removeAuthorization } from "@/auth/utils/authorizations";

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const authRoutes = ["/login", "/signup"];

  const isInAuthRoute = () => {
    return authRoutes.includes(pathname);
  };

  const logout = () => {
    dispatch(clearUser());
    removeAuthorization();
    navigate("/login");
  };

  if (isInAuthRoute()) return;

  return (
    <div className="px-5">
      <div className="flex flex-row justify-between items-center border border-slate-300 rounded-md p-3 my-5 w-full">
        <Link to={"/"} className="h-10 w-1/4">
          <img className="h-full w-35" src={logo} alt="" />
        </Link>
        <div className="flex w-2/4 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/medals">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Médailles
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/athletes">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Athlètes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {user.id ? (
          <div className="flex w-1/4 justify-end items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <p className="text-slate-500 mr-4">{user.email}</p>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    {user.isAdmin ? (
                      <Link
                        to="/admin"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "mb-3"
                        )}
                      >
                        Panel admin
                      </Link>
                    ) : null}
                    <button
                      onClick={logout}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Se déconnecter
                    </button>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        ) : (
          <div className="flex w-1/4 justify-end">
            <Link
              className={buttonVariants({ variant: "outline" })}
              to={"/login"}
            >
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
