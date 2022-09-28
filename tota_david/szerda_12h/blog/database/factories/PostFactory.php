<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // Ez is lehetne a title, sok jó megoldás van:
            // 'title' => Str::ucfirst($faker->words(rand(3, 7), true))

            // rtrim eltávolítja a pontot a mondat végéről
            'title' => rtrim(fake()->sentence(), '.'),

            // \n\n-ek mentén fűzzük össze a paragrafusok tömbjét
            // 'text' => implode('\n\n', fake()->paragraphs(rand(2,8))),
            'text' => fake()->paragraphs(rand(2,8), true),

            'description' => fake()->sentence(),
        ];
    }
}
