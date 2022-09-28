<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // $table->id();
        // $table->string('name');
        // // #RRGGBBAA
        // $table->string('text_color', 9);
        // $table->string('background_color', 9);
        // $table->timestamps();

        return [
            'name' => fake()->word(),
            'text_color' => fake()->safeHexColor() . "ff",
            'background_color' => fake()->safeHexColor() . "ff",
        ];
    }
}
