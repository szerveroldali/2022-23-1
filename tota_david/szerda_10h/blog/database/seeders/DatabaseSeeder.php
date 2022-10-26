<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use \App\Models\User;
use \App\Models\Category;
use \App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users_count = rand(3, 7);
        $users = collect();

        // user1@szerveroldali.hu, user2...
        for ($i = 1; $i < $users_count; $i++) {
            $users->add(
                User::factory()->create([
                    'email' => 'user' . $i . '@szerveroldali.hu'
                ])
            );
        }

        $categories = Category::factory(rand(3, 7))->create();

        $posts = Post::factory(rand(20, 25))->create();

        // Relációk:

        $posts->each(function ($post) use (&$users, &$categories) {
            $post->author()->associate($users->random())->save();

            $category_ids = $categories
                ->random(rand(1, $categories->count()))
                ->pluck('id')
                ->toArray();

            $post->categories()->sync($category_ids);
        });

        // $p = new \App\Models\Post();
        // $p->title = "Title";
        // $p->text = "Content";
        // $p->author_id = 2;
        // $p->save();

        // \App\Models\Post::create([
        //     'title' => 'Title 2',
        //     'text' => 'Content 2',
        //     'author_id' => 2,
        // ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
