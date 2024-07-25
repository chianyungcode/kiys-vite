import { createFileRoute, Link } from "@tanstack/react-router";

import AuthForm from "@/components/auth-form";
import Container from "@/components/ui/container";

const RegisterPage = () => {
  return (
    <Container className="grid grid-cols-2 gap-x-10">
      <div className="relative bg-red-500 rounded-3xl overflow-hidden">
        <img
          src="/public/images/keyboards.webp"
          alt="bg-image"
          className="h-[60rem] object-cover "
        />
        <div className="absolute inset-0 bg-black/20 justify-center lg:px-24 md:px-12 py-6 flex flex-col items-center">
          <div className="bg-white rounded-t-2xl rounded-b-md w-full flex items-center justify-center py-8 px-2">
            <h1 className="font-sora font-semibold">Register account</h1>
          </div>
          <div className="bg-white rounded-t-md rounded-b-2xl w-full flex items-start py-8 px-6">
            <AuthForm isLoginForm={false} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-24">
        <h1 className="text-3xl text-center font-sora font-semibold">
          PERIHPERAL THAT ENHANCE YOUR WORK
        </h1>
        <div className="space-y-2 flex flex-col items-center w-full">
          <p>Already have an account?</p>
          <Link className="underline" to="/login">
            Login here
          </Link>
        </div>
      </div>
    </Container>
  );
};

export const Route = createFileRoute("/_layout/register/")({
  component: RegisterPage,
});