"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { ProductInfo } from "../actions/fetchProducts";
import { updateProductInfo } from "../actions/editProduct";

// Form Schema
const editProductSchema = z.object({
  pName: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters long")
    .max(60, "Product name must be 60 characters or less"),
  pDescription: z
    .string()
    .trim()
    .max(500, "Product description must be 500 characters or less"),
  pCategory: z
    .string()
    .trim()
    .max(50, "Product category must be 50 characters or less"),
  status: z.boolean(),
});

const EditProductForm = ({
  onSuccess,
  productId,
  product,
}: {
  onSuccess: () => void;
  productId: string;
  product: ProductInfo;
}) => {
  // State to handle edit product errors
  const [errorEdit, setErrorEdit] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const editProductForm = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      pName: product.name,
      pDescription: product.description ?? "",
      pCategory: product.category ?? "",
      status: product.active,
    },
  });

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof editProductSchema>) {
    // Clear Error
    setErrorEdit(null);
    // Activate loading spinner
    setLoading(true);
    try {
      await updateProductInfo(
        productId,
        data.pName,
        data.pDescription,
        data.pCategory,
        data.status,
      );
      // Display success message and disable spinner loading
      toast.add({
        type: "success",
        description: `${data.pName} updated successfully`,
        priority: "high",
      });
      // Close modal
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Display Error Message and disable spinner loading
        setErrorEdit(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <form
        id="edit-product-form"
        onSubmit={editProductForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Product Name */}
          <Controller
            name="pName"
            control={editProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-product-form-pName">
                  Product Name
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-product-form-pName"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={60}
                  placeholder="e.g. Classic T-Shirt"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Description */}
          <Controller
            name="pDescription"
            control={editProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-product-form-pDescription">
                  Description
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-product-form-pDescription"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={500}
                  placeholder="Optional product description"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Category */}
          <Controller
            name="pCategory"
            control={editProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-product-form-pCategory">
                  Category
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-product-form-pCategory"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={50}
                  placeholder="e.g. Clothing"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Status */}
          <Controller
            name="status"
            control={editProductForm.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Product Status</FieldLabel>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">
                      {field.value ? "Active" : "Inactive"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {field.value
                        ? "This product is currently active."
                        : "This product is currently inactive."}
                    </p>
                  </div>
                  <Switch
                    id="edit-product-form-status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <Button type="submit" form="edit-product-form">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Saving...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>

        {/* Display Error Message */}
        {errorEdit && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorEdit}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditProductForm;
