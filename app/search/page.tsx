"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  term: z.string().min(1, 'Search term is required'),
});

export default function Search() {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    router.push(`/search/results?term=${encodeURIComponent(data.term)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Acronyms</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="flex gap-2">
          <Input
            {...register('term')}
            placeholder="Enter acronym or keyword"
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
        {errors.term && <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>}
      </form>
    </div>
  );
}