<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Caffeinated\Shinobi\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:roles.index')->only(['index']);
        // $this->middleware('permission:roles.show')->only(['show']);
        $this->middleware('permission:roles.create')->only(['create', 'store']);
        $this->middleware('permission:roles.edit')->only(['edit', 'update']);
        $this->middleware('permission:roles.destroy')->only(['destroy']);
    }
    public function index(Request $request)
    {
        $roles = Role::With(['permissions'])->orderBy('name', 'ASC')->get();

        return response()->json(['roles' => $roles], 200);
    }

    public function getRoles(Request $request)
    {
        $roles = Role::orderBy('name', 'ASC')->get();

        return response()->json(['roles' => $roles], 200);
    }
    // public function show($id)
    // {
    //     $role = Role::findOrFail($id);
    //     return view('admin.roles.show', ['role' => $role]);
    // }
    // public function create()
    // {
    //     $permissions = Permission::all();
    //     return view('admin.roles.create', ['permissions' => $permissions]);
    // }
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'identificador' => 'required',
            'descripcion' => 'required|max:255',
        ]);
        $role = new Role();
        $role->name = $request->nombre;
        $role->slug = $request->identificador;
        $role->description = $request->descripcion;
        if ($role->save()) {
            $role->permissions()->sync(collect($request->permissions)->pluck('id')->toArray());
            return response()->json([
                'created' => true,
            ], 200);
        } else {
            return response()->json([
                'created' => false,
            ], 500);
        }
    }
    // public function edit($id)
    // {
    //     $role = Role::findOrFail($id);
    //     $permissions = Permission::all();
    //     return view('admin.roles.edit', ['role' => $role, 'permissions' => $permissions]);
    // }
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'identificador' => 'required',
            'descripcion' => 'required|max:255',
        ]);
        $role = Role::findOrFail($id);
        $role->name = $request->nombre;
        $role->slug = $request->identificador;
        $role->description = $request->descripcion;
        if ($role->save()) {
            $role->permissions()->sync(collect($request->permissions)->pluck('id')->toArray());
            return response()->json([
                'updated' => true,
            ], 200);
        } else {
            return response()->json([
                'updated' => false,
            ], 500);
        }
    }
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        if ($role->delete()) {
            return response()->json([
                'deleted' => true,
            ], 200);
        }
    }
}
