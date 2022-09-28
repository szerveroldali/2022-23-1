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
            //'title' => Str::ucfirst($faker->words(rand(3, 7), true)),
            'title' => rtrim(fake()->sentence(), '.'),
            'text' => fake()->paragraphs(rand(3,7), true),
            'description' => fake()->sentence(),
        ];
    }
}
