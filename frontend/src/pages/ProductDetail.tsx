import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

import { getProduct } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import AddToCart from '@/components/product/AddToCart';
import ProductThumb from '@/components/product/ProductThumb';

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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleGoBack} variant="ghost" className="mb-6">
            <ArrowLeftIcon />
            Back to Products
          </Button>
          <ErrorDisplay message={error.message} retryText="Retry" />
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
          <div className="md:shrink-0 md:w-1/2">
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
            <div className="mt-6 space-x-2">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
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
