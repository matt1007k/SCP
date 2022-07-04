<?php

use App\Models\HaberDescuento;
use App\Models\Periodo;
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

        Periodo::truncate();

        foreach (range(0, 9) as $i) {
            Periodo::create(['anio' => '199' . $i]);
        }

        foreach (range(0, 19) as $i) {
            $num = '';
            if ($i < 10) {
                $num = '0' . $i;
            } else {
                $num = $i;
            }
            Periodo::create(['anio' => '20' . $num]);
        }

    }
}
