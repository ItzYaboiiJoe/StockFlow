import { ProductInfo } from "../actions/fetchProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProductVariantsDetails = ({ product }: { product: ProductInfo }) => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="mt-2 flex items-center gap-2">
            {product.category && (
              <span className="text-sm text-muted-foreground">
                {product.category}
              </span>
            )}

            <Badge variant={product.active ? "default" : "destructive"}>
              {product.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <Button variant="outline">Edit Product</Button>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {product.description || "No description provided."}
      </p>
    </div>
  );
};

export default ProductVariantsDetails;
