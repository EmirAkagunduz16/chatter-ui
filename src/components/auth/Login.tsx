import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";

const Login = () => {
  return (
    <Auth submitLabel="Login" onSubmit={async () => {}}>
      <Link to={"/signup"} style={{alignSelf: 'center'}}>
        <MUILink>Signup</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
