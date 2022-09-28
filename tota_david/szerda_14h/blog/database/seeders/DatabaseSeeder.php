<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // user1@szerveroldali.hu
        // user2@szerveroldali.hu
        // user3@...
        $users_count = rand(5, 10);
        $users = collect();
        for ($i = 1; $i <= $users_count; $i++) {
            $users->add(
                \App\Models\User::factory()->create([
                    'email' => 'user' . $i . '@szerveroldali.hu',
                ])
            );
        }

        $categories = \App\Models\Category::factory(rand(5, 10))->create();
        $posts = \App\Models\Post::factory(rand(10, 15))->create();

        // Relációk
        $posts->each(function ($post) use (&$users, &$categories) {
            // Szerző
            $post->author()->associate($users->random())->save();

            // Kategóriák
            $post->categories()->sync(
                $categories->random(rand(1, $categories->count()))
            );
        });

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
