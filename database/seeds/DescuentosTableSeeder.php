<?php

use App\Models\HaberDescuento;
use Illuminate\Database\Seeder;

class DescuentosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        HaberDescuento::truncate();
    }
}