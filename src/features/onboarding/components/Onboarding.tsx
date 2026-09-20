import OnboardingForm from "./OnboardingForm";
import Signout from "./Signout";

const Onboarding = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-xl font-semibold">StockFlow</h1>
        <Signout />
      </header>

      {/* Onboarding */}
      <div className="flex justify-center px-4 pt-24">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Welcome to StockFlow</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Let&apos;s get your workspace ready.
            </p>
          </div>
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
