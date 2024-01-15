'use client'
import ProductForm from '@/components/product/ProductForm';
import RouteGuard from '@/components/user/RouteGuard';
import { FormControl, TextField } from '@mui/material';
import { useState } from 'react';

export interface IAddNewProductProps {
}

export default function AddNewProduct(props: IAddNewProductProps) {
  return (
    <RouteGuard>
      <main>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[70vh] lg:py-0">
          <ProductForm/>
          </div>
        </section>
      </main>
    </RouteGuard>
  );
}
