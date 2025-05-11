import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/signup-form";




export default async function AuthPage({params}) {
  const {auth} = await params;
  console.log(auth);
  if(auth?.toLowerCase() === "login"){
    return(<LoginForm />);
  }else if(auth?.toLowerCase() === "signup"){
    return <SignUpForm/>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      
      
      Add your authentication form or components here
    </div>
  );
}