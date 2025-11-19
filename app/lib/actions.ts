'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres'; 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    member_id: z.number({
        invalid_type_error: 'Please select a member.',
    }),
    film_id: z.number({
        invalid_type_error: 'Please select a film.',
    }),
    review_initial_rating: z.number({
        invalid_type_error: 'Please select an initial rating.',
    }),
    review_final_rating: z.number({
        invalid_type_error: 'Please select a final rating.',
    }),
    review_like: z.boolean({
        invalid_type_error: 'Please select like/dislike.',
    }),
});

export type State = {
  errors?: {
    member_id?: string[];
    film_id?: string[];
    review_initial_rating?: string[];
    review_final_rating?: string[];
    review_like?: string[];
  };
  message?: string | null;
};

const CreateReview = FormSchema;

export async function createReview(prevState: State, formData: FormData): Promise<State> {
    const parsedData = CreateReview.safeParse ({
        member_id: Number(formData.get('member_id')),
        film_id: Number(formData.get('film_id')),
        review_initial_rating: Number(formData.get('review_initial_rating')) * 2,
        review_final_rating: Number(formData.get('review_final_rating')) * 2,
        review_like: formData.get('review_like') === "true"
    });
    if (!parsedData.success) {
        return {
        errors: parsedData.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Review.',
        };
    }
    // console.log(parsedData);
    try {
        await sql`
            INSERT INTO reviews (member_id, film_id, review_initial_rating, review_like, review_final_rating)
            VALUES (${parsedData.data.member_id},
                    ${parsedData.data.film_id},
                    ${parsedData.data.review_initial_rating},
                    ${parsedData.data.review_like},
                    ${parsedData.data.review_final_rating})
        `;
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to Create Review.');
    }
    
    revalidatePath('/dashboard/reviews');
    redirect('/dashboard/reviews');
}

const UpdateReview = FormSchema;
 
export async function updateReview(film_id: number, member_id: number, prevState: State, formData: FormData) {
  const parsedData = UpdateReview.safeParse({
    review_initial_rating: formData.get('review_initial_rating'),
    review_final_rating: formData.get('review_final_rating'),
    review_like: formData.get('review_like'),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Review',
    };
  }
 try {
  await sql`
    UPDATE reviews
    SET review_initial_rating = ${parsedData.data.review_initial_rating}, review_final_rating = ${parsedData.data.review_final_rating}, review_like = ${parsedData.data.review_like}
    WHERE film_id = ${film_id} AND member_id = ${member_id}
  `;
 } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to Create Review.');
 }
 
  revalidatePath('/dashboard/reviews');
  redirect('/dashboard/reviews');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}