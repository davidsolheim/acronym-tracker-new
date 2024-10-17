"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  term: z.string().min(1, 'Term is required'),
  definition: z.string().min(1, 'Definition is required'),
  category: z.string().optional(),
});

export default function SubmitAcronym() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/acronyms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Acronym submitted",
          description: "Your acronym has been submitted for review.",
        });
        reset();
      } else {
        throw new Error('Failed to submit acronym');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit acronym. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit New Acronym</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="term" className="block text-sm font-medium mb-1">Term</label>
          <Input id="term" {...register('term')} />
          {errors.term && <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>}
        </div>
        <div>
          <label htmlFor="definition" className="block text-sm font-medium mb-1">Definition</label>
          <Textarea id="definition" {...register('definition')} />
          {errors.definition && <p className="text-red-500 text-sm mt-1">{errors.definition.message}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category (optional)</label>
          <Input id="category" {...register('category')} />
        </div>
        <Button type="submit">Submit Acronym</Button>
      </form>
    </div>
  );
}