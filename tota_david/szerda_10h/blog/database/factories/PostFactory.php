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
        // $table->id();
        // $table->string('title', 255);
        // $table->text('text');
        // $table->string('description')->nullable();
        // $table->string('cover_image_path')->nullable();
        // $table->boolean('hidden')->default(false);
        // $table->unsignedBigInteger('author_id')->nullable();
        // $table->timestamps();

        return [
            // Str::ucfirst(implode(" ", $faker->words(rand(2,6))))
            'title' => rtrim(fake()->sentence(), '.'),
            'text' => fake()->paragraphs(rand(3,7), true),
            'description' => fake()->sentence(),
        ];
    }
}
