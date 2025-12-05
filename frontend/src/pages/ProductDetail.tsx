import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CrownIcon, StarIcon } from 'lucide-react';
import { AxiosError } from 'axios';

import { getProduct } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import AddToCart from '@/components/product/AddToCart';
import ProductThumb from '@/components/product/ProductThumb';

/**
 * Product detail page component that displays comprehensive information about a single product
 * Features include product image gallery, name, description, ratings, price information,
 * product tags, and an add-to-cart button. The page also supports featured product badges
 * and displays star ratings with review count.
 */
function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await getProduct(id!);
      return response.data.data;
    },
    enabled: !!id,
  });

  const handleGoBack = () => {
    navigate('/products');
  };

  if (isLoading) {
    return <Loading message="Loading product details..." />;
  }

  if (error) {
    const errorData =
      error instanceof AxiosError ? error.response?.data : error;
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleGoBack} variant="ghost" className="mb-6">
            <ArrowLeftIcon />
            Back to Products
          </Button>
          <ErrorDisplay message={errorData.message} retryText="Retry" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={handleGoBack}>Back to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button onClick={handleGoBack} variant="ghost" className="mb-6">
        <ArrowLeftIcon />
        Back to Products
      </Button>
      <div className="bg-white overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0 md:w-1/2 relative">
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-cyan-600">
                <CrownIcon className="fill-current" /> Featured
              </Badge>
            )}
            <ProductThumb product={product} className="h-96" />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-muted-foreground">
              Product
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Rating and reviews */}
            <div className="flex gap-2 items-center mt-4">
              <div className="flex gap-1 items-center">
                <StarIcon className="size-5 fill-primary" />
                <div className="font-medium text-sm text-primary">
                  {product.rating}
                </div>
              </div>
              <div>·</div>
              <div className="text-sm text-muted-foreground">
                {product.reviewCount} reviews
              </div>
            </div>

            {/* Price & Compare at price */}
            <div className="mt-6 space-x-2">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="line-through text-muted-foreground">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Product tags */}
            <div className="flex gap-2 mt-4">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <AddToCart product={product} className="mt-8" size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
