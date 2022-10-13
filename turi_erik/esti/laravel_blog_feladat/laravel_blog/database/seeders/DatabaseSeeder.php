<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
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
        $users = collect();
        $n = rand(5, 10);
        for ($i = 1; $i <= $n; $i++){
            $users -> add(User::factory()->create(
                ['email' => 'user'.$i.'@szerveroldali.hu']
            ));
        }

        $posts = Post::factory(rand(10, 20))->create();
        $categories = Category::factory(rand(5, 10))->create();

        $posts -> each(function($p) use (&$users, &$categories) {
            $p -> author() -> associate($users -> random()) -> save();
            $p -> categories() -> attach($categories -> random( rand(1, $categories -> count())));
        });


        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
