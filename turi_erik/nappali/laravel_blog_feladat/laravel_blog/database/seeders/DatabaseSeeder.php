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
        $users = collect();

        for ($i = 1; $i <= 10; $i++){
            $users -> add(\App\Models\User::factory()->create(
                ['email' => 'user' . $i .'@szerveroldali.hu']
            ));
        }    

        for ($i = 1; $i <= 10; $i++){
            \App\Models\Post::factory()->create(
                ['user_id' => $users->random()->id]
            );
        }

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
