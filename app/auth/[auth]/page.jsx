import { ForgotPasswordForm } from "@/components/auth/ForgotPasword-form";
import { LoginForm } from "@/components/auth/login-form";
import { ResetPasswordForm } from "@/components/auth/ResetPassword-form";
import { SignUpForm } from "@/components/auth/signup-form";




export default async function AuthPage({params}) {
  const {auth} = await params;
  console.log(auth);
  if(auth?.toLowerCase() === "login"){
    return(<LoginForm />);
  }else if(auth?.toLowerCase() === "signup"){
    return <SignUpForm/>;
  }else if(auth?.toLowerCase() === "forgotpassword"){
    return <ForgotPasswordForm/>;
  }else if(auth?.toLowerCase() === "resetpassword"){
    return <ResetPasswordForm/>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      
      
      Add your authentication form or components here
    </div>
  );
}