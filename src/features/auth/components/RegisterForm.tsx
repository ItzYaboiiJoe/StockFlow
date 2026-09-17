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

// Form Schema
const registerSchema = z
  .object({
    email: z.email("Enter a valid email").trim(),
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

  // Form Submit Handler
  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log(data);
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
        <Button type="submit" form="register-form" className="w-full">
          Create Account
        </Button>

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
