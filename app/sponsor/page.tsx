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
  acronym: z.string().min(1, 'Acronym is required'),
  sponsorName: z.string().min(1, 'Sponsor name is required'),
  sponsorWebsite: z.string().url('Invalid website URL'),
  sponsorMessage: z.string().min(10, 'Sponsor message must be at least 10 characters'),
  contactEmail: z.string().email('Invalid email address'),
});

export default function SponsorAcronym() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Sponsorship request submitted",
          description: "Your sponsorship request has been submitted for review.",
        });
        reset();
      } else {
        throw new Error('Failed to submit sponsorship request');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit sponsorship request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sponsor an Acronym</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="acronym" className="block text-sm font-medium mb-1">Acronym to Sponsor</label>
          <Input id="acronym" {...register('acronym')} />
          {errors.acronym && <p className="text-red-500 text-sm mt-1">{errors.acronym.message}</p>}
        </div>
        <div>
          <label htmlFor="sponsorName" className="block text-sm font-medium mb-1">Sponsor Name</label>
          <Input id="sponsorName" {...register('sponsorName')} />
          {errors.sponsorName && <p className="text-red-500 text-sm mt-1">{errors.sponsorName.message}</p>}
        </div>
        <div>
          <label htmlFor="sponsorWebsite" className="block text-sm font-medium mb-1">Sponsor Website</label>
          <Input id="sponsorWebsite" {...register('sponsorWebsite')} />
          {errors.sponsorWebsite && <p className="text-red-500 text-sm mt-1">{errors.sponsorWebsite.message}</p>}
        </div>
        <div>
          <label htmlFor="sponsorMessage" className="block text-sm font-medium mb-1">Sponsor Message</label>
          <Textarea id="sponsorMessage" {...register('sponsorMessage')} />
          {errors.sponsorMessage && <p className="text-red-500 text-sm mt-1">{errors.sponsorMessage.message}</p>}
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Contact Email</label>
          <Input id="contactEmail" type="email" {...register('contactEmail')} />
          {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
        </div>
        <Button type="submit">Submit Sponsorship Request</Button>
      </form>
    </div>
  );
}