<?php
use Caffeinated\Shinobi\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {
        Permission::truncate();

        Permission::create([
            'name' => 'Navegar tablero',
            'slug' => 'admin.index',
            'description' => 'Ver el tablero de resumenes en el sistema',
        ]);

        //roles
        Permission::create([
            'name' => 'Navegar roles',
            'slug' => 'roles.index',
            'description' => 'Lista y navega todos los roles del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de un rol',
            'slug' => 'roles.show',
            'description' => 'Ver en detalle cada rol del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de un rol',
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
        //permisos
        Permission::create([
            'name' => 'Navegar permisos',
            'slug' => 'permisos.index',
            'description' => 'Lista y navega todos los permisos del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de un permiso',
            'slug' => 'permisos.show',
            'description' => 'Ver en detalle cada permiso del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de un permiso',
            'slug' => 'permisos.edit',
            'description' => 'Editar los datos de cualquier permiso del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar un permiso',
            'slug' => 'permisos.destroy',
            'description' => 'Eliminar los datos de cualquier permiso del sistema',
        ]);
        Permission::create([
            'name' => 'Registrar un permiso',
            'slug' => 'permisos.create',
            'description' => 'Registrar un permiso del sistema',
        ]);
        //users
        Permission::create([
            'name' => 'Registrar un usuario',
            'slug' => 'users.create',
            'description' => 'Registrar un usuario del sistema',
        ]);
        Permission::create([
            'name' => 'Navegar usuarios',
            'slug' => 'users.index',
            'description' => 'Lista y navega todos los usuarios del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de un usuario',
            'slug' => 'users.show',
            'description' => 'Ver en detalle cada usuario del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de un usuario',
            'slug' => 'users.edit',
            'description' => 'Editar los datos de cualquier usuario del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar un usuario',
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
            'name' => 'Ver detalle de una persona',
            'slug' => 'personas.show',
            'description' => 'Ver en detalle cada persona del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de una persona',
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
        //descuento
        Permission::create([
            'name' => 'Navegar descuentos',
            'slug' => 'descuentos.index',
            'description' => 'Lista y navega todos los descuentos del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de un descuento',
            'slug' => 'descuentos.show',
            'description' => 'Ver en detalle cada descuento del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de un descuento',
            'slug' => 'descuentos.edit',
            'description' => 'Editar los datos de cualquier descuento del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar un descuento',
            'slug' => 'descuentos.destroy',
            'description' => 'Eliminar los datos de cualquier descuento del sistema',
        ]);
        Permission::create([
            'name' => 'Crear un descuento',
            'slug' => 'descuentos.create',
            'description' => 'Crear un descuento en el sistema',
        ]);
        //haber
        Permission::create([
            'name' => 'Navegar haberes',
            'slug' => 'haberes.index',
            'description' => 'Lista y navega todos los haberes del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de un haber',
            'slug' => 'haberes.show',
            'description' => 'Ver en detalle cada haber del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de un haber',
            'slug' => 'haberes.edit',
            'description' => 'Editar los datos de cualquier haber del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar un haber',
            'slug' => 'haberes.destroy',
            'description' => 'Eliminar los datos de cualquier haber del sistema',
        ]);
        Permission::create([
            'name' => 'Crear un haber',
            'slug' => 'haberes.create',
            'description' => 'Crear una haber en el sistema',
        ]);
        //pagos
        Permission::create([
            'name' => 'Navegar pagos',
            'slug' => 'pagos.index',
            'description' => 'Lista y navega todos los pagos del sistema',
        ]);
        Permission::create([
            'name' => 'Ver detalle de un pago',
            'slug' => 'pagos.show',
            'description' => 'Ver en detalle cada pago del sistema',
        ]);
        Permission::create([
            'name' => 'Edición de un pago',
            'slug' => 'pagos.edit',
            'description' => 'Editar los datos de cualquier pago del sistema',
        ]);
        Permission::create([
            'name' => 'Eliminar de un pago',
            'slug' => 'pagos.destroy',
            'description' => 'Eliminar los datos de cualquier pago del sistema',
        ]);
        Permission::create([
            'name' => 'Crear un pago',
            'slug' => 'pagos.create',
            'description' => 'Crear una pago en el sistema',
        ]);
        Permission::create([
            'name' => 'Consultar pagos',
            'slug' => 'pagos.consultar',
            'description' => 'Poder consultar los pagos de reportes en el sistema',
        ]);
        //pagos
        Permission::create([
            'name' => 'Navegar historial',
            'slug' => 'historiales.index',
            'description' => 'Lista y navega todos los historiales del sistema',
        ]);

        //Importar datos
        Permission::create([
            'name' => 'Importar datos de personas o sus pagos',
            'slug' => 'importar.personas',
            'description' => 'Importar los datos de las personas o sus pagos a la BD del sistema',
        ]);
        Permission::create([
            'name' => 'Importar datos de haberes o descuentos',
            'slug' => 'importar.descuentos',
            'description' => 'Importar los datos de los haberes o descuentos a la BD del sistema',
        ]);

    }
}
