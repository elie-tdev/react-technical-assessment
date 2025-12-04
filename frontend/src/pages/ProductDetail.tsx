import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

import { getProduct } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const productAdded = cart.items.find((item) => item.id === id);

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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

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
            {product.images.length ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 object-cover md:h-full rounded-2xl"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center md:h-full rounded-2xl">
                <span className="text-gray-500">No image</span>
              </div>
            )}
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
            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                className="w-full"
                variant={productAdded ? 'outline' : 'default'}
              >
                {productAdded
                  ? `${productAdded?.quantity} added to cart`
                  : 'Added to cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
