import { IconArrowLeft } from "@tabler/icons-react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
