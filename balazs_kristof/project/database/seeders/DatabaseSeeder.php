<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Category;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /*$this->call([
            UserSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            CategorySeeder::class,
        ]);*/
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
        $posts = Post::factory(rand(3, 7))->create();

        // Relációk:

        $posts->each(function ($post) use (&$users, &$categories) {
            $post->user()->associate($users->random())->save();

            $category_ids = $categories
                ->random(rand(1, $categories->count()))
                ->pluck('id')
                ->toArray();

            $post->categories()->sync($category_ids);
        });
    }
}
