import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonLogout from "../../components/button-logout";
import ButtonSave from "./button-save";
import ButtonPrint from "./button-print";
import NavLinkTrigger from "@/components/navlink-trigger";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEditState } from "@/stores/editState";

const ROUTES = [
  { path: "/", placeholder: "Faculty Schedule" },
  { path: "/schedules", placeholder: "Class Schedule" },
  { path: "/rooms", placeholder: "Room Utilization" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [id, setPageID] = useState<string | null>();
  const [navtarget, setNavTarget] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { editState } = useEditState();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const alternativeNavigateHandler = (path: string) => {
    return function () {
      setPageID(searchParams.get("id"));
      if (editState) {
        setNavTarget(path);
        setOpen(true);
        return;
      }

      navigate(path);
      if (id && id !== "" && path === "/")
        setSearchParams({ userId: id as string });
    };
  };

  return (
    <>
      <header className="bg-black/80">
        <div className="container flex items-center justify-between py-2">
          <nav className="gap-2 text-white">
            {ROUTES.map((route) => (
              <Button
                key={route.path}
                className={`${pathname === route.path ? "bg-white text-black" : "bg-transparent"}`}
                style={{ marginRight: "2em" }}
                onClick={alternativeNavigateHandler(route.path)}
              >
                {route.placeholder}
              </Button>
            ))}
          </nav>

          <div className="flex gap-8">
            <div className="flex gap-2">
              <ButtonSave />
              <ButtonPrint />
            </div>

            <ButtonLogout />
          </div>
        </div>
      </header>
      <NavLinkTrigger
        navtarget={navtarget}
        id={id}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default Header;
