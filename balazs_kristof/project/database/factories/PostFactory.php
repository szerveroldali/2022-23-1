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
            'user_id' => 1,
            'title' => fake()->text(32),
            'desc' => fake()->text(48),
            'text' => fake()->text(512),
            'cover_image' => asset('images/default_post_cover.jpg'),
        ];
    }
}
