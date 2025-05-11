import LoginPage from "./Login";



export default async function AuthPage({params}) {
  const {auth} = await params;
  console.log(auth);
  if(auth?.toLowerCase() === "login"){
    return(<LoginPage />);
  }else if(auth?.toLowerCase() === "signup"){
    return <div>Sign up</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      
      
      Add your authentication form or components here
    </div>
  );
}