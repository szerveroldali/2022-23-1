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
        // user2@...
        $users_count = rand(5, 10);
        $users = collect();
        for ($i = 1; $i <= $users_count; $i++) {
            $users->add(
                \App\Models\User::factory()->create([
                    'email' => 'user' . $i . '@szerveroldali.hu'
                ])
            );
        }

        $categories = \App\Models\Category::factory(rand(7,10))->create();
        $posts = \App\Models\Post::factory(rand(10,15))->create();

        // A post a "közös pont": szerző + kategória is tartozik hozzá
        $posts->each(function ($post) use (&$users, &$categories) {
            // Szerző hozzáadása
            $post->author()->associate($users->random())->save();

            // Kategóriák hozzáadása
            $post->categories()->sync(
                $categories->random(
                    rand(1, $categories->count())
                )
            );
        });

        // $post = new \App\Models\Post();
        // $post->title = "Title";
        // $post->text = "Content";
        // $post->save();

        // \App\Models\Post::create([
        //     'title' => 'Title 2',
        //     'text' => 'Content 2'
        // ]);

        // \App\Models\Post::factory()->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
