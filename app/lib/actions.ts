'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    member_id: z.number(),
    film_id: z.number(),
    review_initial_rating: z.number(),
    review_final_rating: z.number(),
    review_like: z.boolean(),
});

const CreateReview = FormSchema;

export async function createReview(formData: FormData) {
    try {
    const parsedData = CreateReview.parse ({
        member_id: Number(formData.get('member_id')),
        film_id: Number(formData.get('film_id')),
        review_initial_rating: Number(formData.get('review_initial_rating')) * 2,
        review_final_rating: Number(formData.get('review_final_rating')) * 2,
        review_like: formData.get('review_like') === "true"
    });
    console.log(parsedData);

    await sql`
        INSERT INTO reviews (member_id, film_id, review_initial_rating, review_like, review_final_rating)
        VALUES (${parsedData.member_id},
                ${parsedData.film_id},
                ${parsedData.review_initial_rating},
                ${parsedData.review_like},
                ${parsedData.review_final_rating})
    `;
    } catch (error) {
        console.error('Form Error:', error);
        throw new Error('Failed to parse new review data.');
    }
    revalidatePath('/dashboard/reviews');
    redirect('/dashboard/reviews');
}