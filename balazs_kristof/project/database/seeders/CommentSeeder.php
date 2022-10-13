<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\Comment::create([
            'user_id' => 1,
            'post_id' => 1,
            'text' => fake()->text(128)
        ])->save();
    }
}
