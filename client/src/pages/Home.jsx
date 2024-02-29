// Home.jsx
import React from 'react';
import { Products } from './data.js';
import ProductItem from './ProductItem.jsx';

export default function Home() {
  return (
    <div className="container mx-auto my-8">
      {Products && Products.length > 0 && (
        <div className="">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Products with Quality</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {Products.map((Product) => (
              <ProductItem Product={Product} key={Product._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
