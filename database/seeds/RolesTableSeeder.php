<?php
use App\Models\User;
use Caffeinated\Shinobi\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::truncate();
        //roles
        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Acceso a todos los módulos del sistema',
            'special' => 'all-access',
        ]);
        Role::create([
            'name' => 'Suspendido',
            'slug' => 'suspendido',
            'description' => 'Sin acceso a los módulos del sistema',
            'special' => 'no-access',
        ]);
        Role::create([
            'name' => 'Tesoreria',
            'description' => 'Acceso a los módulos de pagos, personas, Haberes y Descuentos del sistemas',
            'slug' => 'tesoreria',
        ]);
        Role::create([
            'name' => 'Personal',
            'description' => 'Acceso a los módulos de importar datos al db del sistemas',
            'slug' => 'personal',
        ]);

        $user = User::find(1);
        $user->roles()->sync(1);
    }
}
