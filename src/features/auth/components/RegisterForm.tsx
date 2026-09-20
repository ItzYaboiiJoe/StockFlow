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
import Link from "next/link";
import {
  registerUser,
  createUser,
  checkEmailExists,
} from "../actions/register";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

// Form Schema
const registerSchema = z
  .object({
    email: z.email("Enter a valid email").trim().toLowerCase(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long")
      .trim(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters long")
      .trim(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  // State to handle register errors
  const [errorRegister, setErrorRegister] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);
  // Create Form Instance
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof registerSchema>) {
    // Clear Error
    setErrorRegister(null);
    // Activate loading spinner
    setLoading(true);
    try {
      // Check if the email exists
      const emailExists = await checkEmailExists(data.email);
      if (emailExists.length > 0) {
        setLoading(false);
        toast.add({
          type: "error",
          description: "This email already exists.",
          priority: "high",
        });
        return;
      }
      // Register the user with email and password
      const registerUserData = await registerUser(data.email, data.password);
      // Create the user in the database
      await createUser(
        registerUserData.user!.id,
        data.firstName,
        data.lastName,
        data.email,
      );
      // Display success message and disable spinner loading
      toast.add({
        type: "success",
        description:
          "Account created successfully. Please check your email to verify your account.",
        priority: "high",
      });
      setLoading(false);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Display Error Message and disable spinner loading
        setErrorRegister(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Sign up for a new StockFlow account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={registerForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email */}
            <Controller
              name="email"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <Controller
                name="firstName"
                control={registerForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-form-first-name">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-form-first-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="First Name"
                      type="text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Last Name */}
              <Controller
                name="lastName"
                control={registerForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-form-last-name">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-form-last-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Last Name"
                      type="text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            {/* Password */}
            <Controller
              name="password"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="register-form-password">
                      Password
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id="register-form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="register-form-confirmPassword">
                      Confirm Password
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id="register-form-confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                    type="password"
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
      <CardFooter className="flex flex-col gap-4">
        <Button
          disabled={loading}
          type="submit"
          form="register-form"
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Creating...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
        {/* Display Error Message */}
        {errorRegister && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorRegister}
          </p>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
