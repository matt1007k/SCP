<?php
use Caffeinated\Shinobi\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {
        Permission::truncate();

        //permisos
        Permission::create([
            'name' => 'Navegar roles',
            'slug' => 'roles.index',
            'description' => 'Lista y navega todos los roles del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de rol',
            'slug' => 'roles.show',
            'description' => 'Ver en detalle cada rol del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de rol',
            'slug' => 'roles.edit',
            'description' => 'Editar los datos de cualquier rol del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar un rol',
            'slug' => 'roles.destroy',
            'description' => 'Eliminar los datos de cualquier rol del sistema',
        ]);
        Permission::create([
            'name' => 'Registrar un rol',
            'slug' => 'roles.create',
            'description' => 'Registrar un rol del sistema',
        ]);
        //users
        Permission::create([
            'name' => 'Navegar usuarios',
            'slug' => 'users.index',
            'description' => 'Lista y navega todos los usuarios del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de usuario',
            'slug' => 'users.show',
            'description' => 'Ver en detalle cada usuario del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de usuarios',
            'slug' => 'users.edit',
            'description' => 'Editar los datos de cualquier usuario del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar una usuario',
            'slug' => 'users.destroy',
            'description' => 'Eliminar los datos de cualquier usuario del sistema',
        ]);
        //personas
        Permission::create([
            'name' => 'Navegar personas',
            'slug' => 'personas.index',
            'description' => 'Lista y navega todos los personas del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de persona',
            'slug' => 'personas.show',
            'description' => 'Ver en detalle cada persona del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de personas',
            'slug' => 'personas.edit',
            'description' => 'Editar los datos de cualquier persona del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar una persona',
            'slug' => 'personas.destroy',
            'description' => 'Eliminar los datos de cualquier persona del sistema',
        ]);
        Permission::create([
            'name' => 'Crear una persona',
            'slug' => 'personas.create',
            'description' => 'Crear una persona en el sistema',
        ]);
        //haber descuento
        Permission::create([
            'name' => 'Navegar haberes y descuentos',
            'slug' => 'haber_descuentos.index',
            'description' => 'Lista y navega todos los haberes y descuentos del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de haber y descuento',
            'slug' => 'haber_descuentos.show',
            'description' => 'Ver en detalle cada haber y descuento del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de haber y descuentos',
            'slug' => 'haber_descuentos.edit',
            'description' => 'Editar los datos de cualquier haber y descuento del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar una haber y descuento',
            'slug' => 'haber_descuentos.destroy',
            'description' => 'Eliminar los datos de cualquier haber y descuento del sistema',
        ]);
        Permission::create([
            'name' => 'Crear una haber y descuento',
            'slug' => 'haber_descuentos.create',
            'description' => 'Crear una haber y descuento en el sistema',
        ]);
        //pagos
        Permission::create([
            'name' => 'Navegar pagos',
            'slug' => 'pagos.index',
            'description' => 'Lista y navega todos los pagos del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de pagos',
            'slug' => 'pagos.show',
            'description' => 'Ver en detalle cada pagos del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de pagos',
            'slug' => 'pagos.edit',
            'description' => 'Editar los datos de cualquier pagos del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar una pagos',
            'slug' => 'pagos.destroy',
            'description' => 'Eliminar los datos de cualquier pagos del sistema',
        ]);
        Permission::create([
            'name' => 'Crear una pagos',
            'slug' => 'pagos.create',
            'description' => 'Crear una pagos en el sistema',
        ]);
        Permission::create([
            'name' => 'Consultar pagos ',
            'slug' => 'pagos.consultar',
            'description' => 'Ver los pagos consultar en el sistema',
        ]);

        //Importar datos
        Permission::create([
            'name' => 'Importar datos de personas',
            'slug' => 'importar.personas',
            'description' => 'Importar los datos de las personas a la BD del sistema',
        ]);
        Permission::create([
            'name' => 'Importar datos de haberes y descuentos',
            'slug' => 'importar.descuentos',
            'description' => 'Importar los datos de los haberes y descuentos a la BD del sistema',
        ]);

    }
}