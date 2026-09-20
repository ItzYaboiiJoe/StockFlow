"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { createBusiness, createBusinessOwner } from "../actions/createBusiness";
import { toast } from "@/components/ui/toast";

// Form Schema
const onboardingSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters long"),
});

const OnboardingForm = () => {
  // State to handle onboarding errors
  const [errorOnboarding, setErrorOnboarding] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const onboardingForm = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      businessName: "",
    },
  });

  const router = useRouter();

  // Handle Form Submission
  async function onSubmit(data: z.infer<typeof onboardingSchema>) {
    // Clear Error
    setErrorOnboarding(null);
    // Activate loading spinner
    setLoading(true);
    try {
      // Insert business into DB
      const businessID = await createBusiness(data.businessName);
      // Create the user as business owner in DB
      await createBusinessOwner(businessID.id);
      // Show the user confirmation message
      toast.add({
        type: "success",
        description: `Business ${data.businessName} Created!`,
        priority: "high",
      });
      setLoading(false);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Display Error Message and disable spinner loading
        setErrorOnboarding(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Set up your business</CardTitle>
        <CardDescription>
          Create your StockFlow workspace to start managing your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="onboarding-form"
          onSubmit={onboardingForm.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* Business Name */}
            <Controller
              name="businessName"
              control={onboardingForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="onboarding-form-name">
                    Business Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="onboarding-form-name"
                    placeholder="Enter your business name"
                    aria-invalid={fieldState.invalid}
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          disabled={loading}
          type="submit"
          form="onboarding-form"
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Creating...</span>
            </div>
          ) : (
            "Create Business"
          )}
        </Button>
        {/* Display Error Message */}
        {errorOnboarding && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorOnboarding}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default OnboardingForm;
