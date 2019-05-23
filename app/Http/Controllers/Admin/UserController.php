<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:users.index')->only(['index']);
        // $this->middleware('permission:users.show')->only(['show']);
        $this->middleware('permission:users.edit')->only(['update']);
        $this->middleware('permission:users.destroy')->only(['destroy']);
    }
    public function index()
    {
        $columns = ['name', 'dni', 'email'];
        $length = $request->input('length');
        $column = $request->input('column'); //Index
        $dir = $request->input('dir');
        $searchValue = $request->input('search');
        $query = User::select('id', 'name', 'slug', 'description')->
            orderBy($columns[$column], $dir)->with(['roles', 'permissions']);
        if ($searchValue) {
            $query->where(function ($query) use ($searchValue) {
                $query->where('name', 'like', '%' . $searchValue . '%')
                    ->orWhere('dni', 'like', '%' . $searchValue . '%')
                    ->orWhere('email', 'like', '%' . $searchValue . '%');
            });
        }
        $roles = $query->paginate($length);

        return response()->json(['roles' => $roles, 'draw' => $request->input('draw')], 200);
    }
    // public function show($id)
    // {
    //     $user = User::findOrFail($id);
    //     return view('admin.usuarios.show', ['user' => $user]);
    // }
    // public function edit($id)
    // {
    //     $user = User::findOrFail($id);
    //     $roles = Role::all();
    //     return view('admin.usuarios.edit', ['user' => $user, 'roles' => $roles]);
    // }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->dni = $request->dni;
        if ($user->save()) {
            $user->roles()->sync($request->get('roles'));
            return response()->json([
                'updated' => true,
            ], 200);
        } else {
            return response()->json([
                'updated' => false,
            ], 200);
        }
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->estado === 'activo') {
            $user->estado = 'inactivo';
        } else if ($user->estado === 'inactivo') {
            $user->estado = 'activo';
        }

        if ($user->save()) {
            return response()->json([
                'deleted' => true,
            ]);
        }

    }
}