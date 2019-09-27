<?php

use Faker\Factory;
use App\Models\Pago;
use App\Models\User;
use App\Models\Detalle;
use App\Models\Persona;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class PersonasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        Persona::truncate();
        Pago::truncate();
        Detalle::truncate();

        // Schema::disableForeignKeyConstraints();
        User::truncate();
        // HaberDescuento::truncate();
        // Schema::enableForeignKeyConstraints();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@drea.com',
            'dni' => '12345678',
            'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
            'remember_token' => Str::random(10),
        ]);

        // foreach (range(1, 25) as $i) {
        //     $dni = mt_rand(10000000, 99999999);
        //     Persona::create([
        //         'nombre' => $faker->firstname,
        //         'apellidoPaterno' => $faker->lastname,
        //         'apellidoMaterno' => $faker->lastname,
        //         'dni' => $dni,
        //         'codmodular' => '10' . $dni,
        //         'user_id' => 1,
        //         'estado' => $faker->randomElement(['activo', 'inactivo']),
        //     ]);
        // }

    }
}