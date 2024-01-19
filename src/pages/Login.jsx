import Meta from "../components/Meta";
import GoogleAuth from "../components/GoogleAuth/GoogleAuth";
import LoginForm from "../components/Forms/LoginForm";
// import Lottie from "../components/Lottie";

const Login = () => {

  return (
    <>
      <Meta title={"Login Page"} />
      <div className="pt-[100px] min-h-screen  ">
        <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            {/*  */}
            <GoogleAuth />
            {/*  */}
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
