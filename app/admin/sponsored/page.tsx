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
  acronymId: z.string().min(1, 'Acronym ID is required'),
  content: z.string().min(1, 'Ad content is required'),
  sponsorName: z.string().min(1, 'Sponsor name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

export default function ManageSponsored() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/sponsored', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Sponsored ad created",
          description: "The sponsored ad has been created successfully.",
        });
        reset();
      } else {
        throw new Error('Failed to create sponsored ad');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create sponsored ad. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Sponsored Ads</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="acronymId" className="block text-sm font-medium mb-1">Acronym ID</label>
          <Input id="acronymId" {...register('acronymId')} />
          {errors.acronymId && <p className="text-red-500 text-sm mt-1">{errors.acronymId.message}</p>}
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Ad Content</label>
          <Textarea id="content" {...register('content')} />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>
        <div>
          <label htmlFor="sponsorName" className="block text-sm font-medium mb-1">Sponsor Name</label>
          <Input id="sponsorName" {...register('sponsorName')} />
          {errors.sponsorName && <p className="text-red-500 text-sm mt-1">{errors.sponsorName.message}</p>}
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
          <Input id="startDate" type="date" {...register('startDate')} />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
          <Input id="endDate" type="date" {...register('endDate')} />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
        </div>
        <Button type="submit">Create Sponsored Ad</Button>
      </form>
    </div>
  );
}